import { useEffect, useRef } from "react";

// Импортируем p5 только на клиенте
let p5Instance: any = null;
import bgConfig from "./config_bg";

export default function BackgroundP5() {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let p5: any;
    let sketch: (p: any) => void;

    // --- p5-скетч пользователя ---
    sketch = (p: any) => {
      // Интерфейс для узла
      interface Node {
        position: any;
        velocity: any;
        acceleration: any;
        isMajor: boolean;
        tetherPoint: any;
        applyForces(): void;
        update(): void;
        display(): void;
      }
      // Интерфейс для соединения (индексы двух узлов)
      type Connection = [number, number];

      let nodes: Node[] = [];
      let connections: Connection[] = [];
      const settings = bgConfig;

      p.setup = () => {
        // Сброс массивов при каждом запуске скетча
        nodes = [];
        connections = [];
        p.createCanvas(window.innerWidth, window.innerHeight);
        for (let i = 0; i < settings.numNodes; i++) {
          nodes.push(new Node(i < settings.numMajorNodes));
        }
        let connectionCount = Array(settings.numNodes).fill(0);
        const maxConnectionsPerNode = 5;
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            if (connectionCount[i] >= maxConnectionsPerNode || connectionCount[j] >= maxConnectionsPerNode) continue;
            const d = nodes[i].position.dist(nodes[j].position);
            if (d < settings.restLength * 1.5) {
              connections.push([i, j]);
              connectionCount[i]++;
              connectionCount[j]++;
            }
          }
        }
        for (let i = 0; i < nodes.length; i++) {
          if (connectionCount[i] === 0) {
            let closestNodeIndex = -1;
            let minDistance = Infinity;
            for (let j = 0; j < nodes.length; j++) {
              if (i === j) continue;
              const d = nodes[i].position.dist(nodes[j].position);
              if (d < minDistance) {
                minDistance = d;
                closestNodeIndex = j;
              }
            }
            if (closestNodeIndex !== -1) {
              connections.push([i, closestNodeIndex]);
              connectionCount[i]++;
              connectionCount[closestNodeIndex]++;
            }
          }
        }
      };

      p.draw = () => {
        p.clear(); // прозрачный фон, чтобы не затирать вибрацию
        // --- Проверка наведения курсора на лучи основных узлов ---
        for (const node of nodes) {
          if (!node.isMajor) continue;
          let direction = p5.Vector.sub(node.position, node.tetherPoint);
          const endPoint = p5.Vector.add(node.position, direction.setMag(settings.rayLength));
          const dist = pointToSegmentDist(
            p.mouseX, p.mouseY,
            node.position.x, node.position.y,
            endPoint.x, endPoint.y
          );
          if (dist < settings.hitThreshold) {
            // Запускаем вибрацию только если она не активна
            if (!node.isVibrating || node.vibrationAmplitude < 0.1) {
              node.isVibrating = true;
              node.vibrationAmplitude = settings.vibrationAmplitude;
              node.vibrationStartTime = p.millis();
              // Сохраняем положение наведения вдоль луча (tHover)
              const dx = endPoint.x - node.position.x;
              const dy = endPoint.y - node.position.y;
              const len = Math.hypot(dx, dy);
              let tHover = 0.5;
              if (len > 0) {
                const tx = (p.mouseX - node.position.x) * dx + (p.mouseY - node.position.y) * dy;
                tHover = Math.max(0, Math.min(1, tx / (len * len)));
              }
              node.vibrationClickT = tHover;
              // Импульс перпендикулярно лучу
              const perp = p.createVector(-(endPoint.y - node.position.y), endPoint.x - node.position.x).normalize();
              perp.mult(settings.impulseStrength);
              node.velocity.add(perp);
            }
          }
          // --- Сброс вибрации через 3 секунды ---
          if (node.isVibrating && p.millis() - node.vibrationStartTime > 3000) {
            node.isVibrating = false;
            node.vibrationAmplitude = 0;
          }
        }
        for (let node of nodes) node.applyForces();
        for (let node of nodes) node.update();
        drawLines();
        for (let node of nodes) node.display();
      };

      function drawLines() {
        for (const conn of connections) {
          const nodeA = nodes[conn[0]];
          const nodeB = nodes[conn[1]];
          const avgZ = (nodeA.position.z + nodeB.position.z) / 2;
          const weight = p.map(avgZ, -settings.zDepth, settings.zDepth, settings.minLineWeight, settings.maxLineWeight);
          const alpha = p.map(avgZ, -settings.zDepth, settings.zDepth, 20, 100);
          p.stroke(...settings.connectionLineColor, alpha);
          p.strokeWeight(p.constrain(weight, settings.minLineWeight, settings.maxLineWeight));
          p.line(nodeA.position.x, nodeA.position.y, nodeB.position.x, nodeB.position.y);
        }
        for (const node of nodes) {
          if (node.isMajor) {
            const weight = p.map(node.position.z, -settings.zDepth, settings.zDepth, settings.minLineWeight, settings.maxLineWeight * 1.2);
            const alpha = p.map(node.position.z, -settings.zDepth, settings.zDepth, 60, 180);
            // Используем majorNodeColor для лучей основных узлов
            p.stroke(...settings.majorNodeColor, alpha);
            p.strokeWeight(p.constrain(weight, settings.minLineWeight, settings.maxLineWeight));
            let direction = p5.Vector.sub(node.position, node.tetherPoint);
            const endPoint = p5.Vector.add(node.position, direction.setMag(settings.rayLength));
            // --- Вибрация: если активна, рисуем синусоиду с максимумом в месте клика ---
            if (node.isVibrating && node.vibrationAmplitude > 0.1) {
              const segs = 64;
              const tClick = node.vibrationClickT ?? 0.5; // где максимум (0..1)
              const decayAlpha = settings.waveDecayAlpha ?? 25; // Управляет "короткостью" волны (теперь из конфига)
              const time = (p.millis() - node.vibrationStartTime) * 0.0005; // время в секундах
              const decay = Math.exp(-2 * time); // экспоненциальное затухание
              p.beginShape(); // Начинаем рисовать волнообразную линию
              const dx = endPoint.x - node.position.x; 
              const dy = endPoint.y - node.position.y;
              const len = Math.hypot(dx, dy);
              const nx = -dy / len;
              const ny = dx / len;
              for (let i = 0; i <= segs; i++) {
                const t = i / segs;
                const x = p.lerp(node.position.x, endPoint.x, t);
                const y = p.lerp(node.position.y, endPoint.y, t);
                // Локальная амплитуда: максимум в tClick, затухание к концам
                // Создаем несколько волн (waveCount полуволн) и ограничиваем их плавной гауссовой "шапкой"
                const waveCount = settings.waveCount ?? 4;
                const localAmp = node.vibrationAmplitude * Math.sin(waveCount * Math.PI * t) * Math.exp(-decayAlpha * Math.pow(t - tClick, 2)) * Math.sin(2 * Math.PI * settings.vibrationFrequency * time) * decay;
                // Отключаем заливку для волны
                if (i === 0) p.noFill();
                p.vertex(x + nx * localAmp, y + ny * localAmp);
              }
              p.endShape();
              // Затухание амплитуды
              node.vibrationAmplitude *= settings.vibrationDecay;
              if (node.vibrationAmplitude < 0.1) node.isVibrating = false;
            } else {
              // Просто линия без волны
              p.line(node.position.x, node.position.y, endPoint.x, endPoint.y);
            }
          }
        }
      }

      // --- Вспомогательная функция: расстояние от точки до отрезка ---
      function pointToSegmentDist(px: number, py: number, x1: number, y1: number, x2: number, y2: number) {
        // Алгоритм: проекция точки на отрезок
        const dx = x2 - x1;
        const dy = y2 - y1;
        if (dx === 0 && dy === 0) return Math.hypot(px - x1, py - y1);
        const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy)));
        const projX = x1 + t * dx;
        const projY = y1 + t * dy;
        return Math.hypot(px - projX, py - projY);
      }

      class Node {
        position: any;
        velocity: any;
        acceleration: any;
        isMajor: boolean;
        tetherPoint: any;
        // --- Для вибрации луча ---
        isVibrating: boolean = false; // Активна ли вибрация
        vibrationAmplitude: number = 0; // Текущая амплитуда
        vibrationStartTime: number = 0; // Время запуска вибрации
        vibrationClickT?: number; // Положение клика вдоль луча (0..1)
      
        constructor(isMajor = false) {
          this.position = p5.Vector.random3D().mult(p.random(p.width / 4));
          this.position.add(p.width / 2, p.height / 2, 0);
          this.velocity = p.createVector();
          this.acceleration = p.createVector();
          this.isMajor = isMajor;
          if (this.isMajor) {
            this.tetherPoint = p.createVector(p.random(p.width), p.random(p.height), p.random(-settings.zDepth, settings.zDepth));
          }
        }

        applyForces() {
          for (const conn of connections) {
            let otherNodeIndex = -1;
            if (conn[0] === nodes.indexOf(this)) otherNodeIndex = conn[1];
            if (conn[1] === nodes.indexOf(this)) otherNodeIndex = conn[0];
            if (otherNodeIndex !== -1) {
              const otherNode = nodes[otherNodeIndex];
              let force = p5.Vector.sub(this.position, otherNode.position);
              let stretch = force.mag() - settings.restLength;
              force.normalize().mult(-1 * settings.springStiffness * stretch);
              this.acceleration.add(force);
            }
          }
          if (this.isMajor) {
            let tetherForce = p5.Vector.sub(this.tetherPoint, this.position);
            tetherForce.mult(settings.tetherStrength);
            this.acceleration.add(tetherForce);
          }
        }

        update() {
          this.velocity.mult(1 - settings.damping);
          this.velocity.add(this.acceleration);
          this.velocity.limit(settings.maxSpeed);
          if (this.isMajor) {
            this.velocity.mult(settings.majorNodeMobility); // Успокаиваем основные узлы
          }
          this.position.add(this.velocity);
          this.acceleration.mult(0);
        }

        display() {
          const z = this.position.z;
          const radius = p.map(z, -settings.zDepth, settings.zDepth, settings.minNodeRadius, settings.maxNodeRadius);
          const alpha = p.map(z, -settings.zDepth, settings.zDepth, 100, 255);
          p.noStroke();
          // Используем majorNodeColor для основных узлов
          if (this.isMajor) {
            p.fill(...settings.majorNodeColor, alpha);
          } else {
            p.fill(...settings.nodeColor, alpha);
          }
          p.circle(this.position.x, this.position.y, radius * 2);
        }
      }
    };

    import("p5").then((module) => {
      p5 = module.default;
      if (sketchRef.current) {
        p5Instance = new p5(sketch, sketchRef.current);
      }
    });

    return () => {
      if (p5Instance) {
        p5Instance.remove();
        p5Instance = null;
      }
    };
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1, opacity: 0.7, pointerEvents: "auto" }}>
      {/* Контейнер для p5-скетча */}
      <div ref={sketchRef} style={{ width: "100vw", height: "100vh" }} />
    </div>
  );
}
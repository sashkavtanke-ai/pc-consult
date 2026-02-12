import { useEffect, useRef } from "react";

// РРјРїРѕСЂС‚РёСЂСѓРµРј p5 С‚РѕР»СЊРєРѕ РЅР° РєР»РёРµРЅС‚Рµ
let p5Instance: any = null;
import bgConfig from "./config_bg";

export default function BackgroundP5() {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let p5: any;
    let sketch: (p: any) => void;

    // --- p5-СЃРєРµС‚С‡ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ ---
    sketch = (p: any) => {
      // РРЅС‚РµСЂС„РµР№СЃ РґР»СЏ СѓР·Р»Р°
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
      // РРЅС‚РµСЂС„РµР№СЃ РґР»СЏ СЃРѕРµРґРёРЅРµРЅРёСЏ (РёРЅРґРµРєСЃС‹ РґРІСѓС… СѓР·Р»РѕРІ)
      type Connection = [number, number];

      let nodes: Node[] = [];
      let connections: Connection[] = [];
      const settings = bgConfig;

      p.setup = () => {
        // РЎР±СЂРѕСЃ РјР°СЃСЃРёРІРѕРІ РїСЂРё РєР°Р¶РґРѕРј Р·Р°РїСѓСЃРєРµ СЃРєРµС‚С‡Р°
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
        p.clear(); // РїСЂРѕР·СЂР°С‡РЅС‹Р№ С„РѕРЅ, С‡С‚РѕР±С‹ РЅРµ Р·Р°С‚РёСЂР°С‚СЊ РІРёР±СЂР°С†РёСЋ
        // --- РџСЂРѕРІРµСЂРєР° РЅР°РІРµРґРµРЅРёСЏ РєСѓСЂСЃРѕСЂР° РЅР° Р»СѓС‡Рё РѕСЃРЅРѕРІРЅС‹С… СѓР·Р»РѕРІ ---
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
            // Р—Р°РїСѓСЃРєР°РµРј РІРёР±СЂР°С†РёСЋ С‚РѕР»СЊРєРѕ РµСЃР»Рё РѕРЅР° РЅРµ Р°РєС‚РёРІРЅР°
            if (!node.isVibrating || node.vibrationAmplitude < 0.1) {
              node.isVibrating = true;
              node.vibrationAmplitude = settings.vibrationAmplitude;
              node.vibrationStartTime = p.millis();
              // РЎРѕС…СЂР°РЅСЏРµРј РїРѕР»РѕР¶РµРЅРёРµ РЅР°РІРµРґРµРЅРёСЏ РІРґРѕР»СЊ Р»СѓС‡Р° (tHover)
              const dx = endPoint.x - node.position.x;
              const dy = endPoint.y - node.position.y;
              const len = Math.hypot(dx, dy);
              let tHover = 0.5;
              if (len > 0) {
                const tx = (p.mouseX - node.position.x) * dx + (p.mouseY - node.position.y) * dy;
                tHover = Math.max(0, Math.min(1, tx / (len * len)));
              }
              node.vibrationClickT = tHover;
              // РРјРїСѓР»СЊСЃ РїРµСЂРїРµРЅРґРёРєСѓР»СЏСЂРЅРѕ Р»СѓС‡Сѓ
              const perp = p.createVector(-(endPoint.y - node.position.y), endPoint.x - node.position.x).normalize();
              perp.mult(settings.impulseStrength);
              node.velocity.add(perp);
            }
          }
          // --- РЎР±СЂРѕСЃ РІРёР±СЂР°С†РёРё С‡РµСЂРµР· 3 СЃРµРєСѓРЅРґС‹ ---
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
            // РСЃРїРѕР»СЊР·СѓРµРј majorNodeColor РґР»СЏ Р»СѓС‡РµР№ РѕСЃРЅРѕРІРЅС‹С… СѓР·Р»РѕРІ
            p.stroke(...settings.majorNodeColor, alpha);
            p.strokeWeight(p.constrain(weight, settings.minLineWeight, settings.maxLineWeight));
            let direction = p5.Vector.sub(node.position, node.tetherPoint);
            const endPoint = p5.Vector.add(node.position, direction.setMag(settings.rayLength));
            // --- Р’РёР±СЂР°С†РёСЏ: РµСЃР»Рё Р°РєС‚РёРІРЅР°, СЂРёСЃСѓРµРј СЃРёРЅСѓСЃРѕРёРґСѓ СЃ РјР°РєСЃРёРјСѓРјРѕРј РІ РјРµСЃС‚Рµ РєР»РёРєР° ---
            if (node.isVibrating && node.vibrationAmplitude > 0.1) {
              const segs = 64;
              const tClick = node.vibrationClickT ?? 0.5; // РіРґРµ РјР°РєСЃРёРјСѓРј (0..1)
              const decayAlpha = settings.waveDecayAlpha ?? 25; // РЈРїСЂР°РІР»СЏРµС‚ "РєРѕСЂРѕС‚РєРѕСЃС‚СЊСЋ" РІРѕР»РЅС‹ (С‚РµРїРµСЂСЊ РёР· РєРѕРЅС„РёРіР°)
              const time = (p.millis() - node.vibrationStartTime) * 0.0005; // РІСЂРµРјСЏ РІ СЃРµРєСѓРЅРґР°С…
              const decay = Math.exp(-2 * time); // СЌРєСЃРїРѕРЅРµРЅС†РёР°Р»СЊРЅРѕРµ Р·Р°С‚СѓС…Р°РЅРёРµ
              p.beginShape(); // РќР°С‡РёРЅР°РµРј СЂРёСЃРѕРІР°С‚СЊ РІРѕР»РЅРѕРѕР±СЂР°Р·РЅСѓСЋ Р»РёРЅРёСЋ
              const dx = endPoint.x - node.position.x; 
              const dy = endPoint.y - node.position.y;
              const len = Math.hypot(dx, dy);
              const nx = -dy / len;
              const ny = dx / len;
              for (let i = 0; i <= segs; i++) {
                const t = i / segs;
                const x = p.lerp(node.position.x, endPoint.x, t);
                const y = p.lerp(node.position.y, endPoint.y, t);
                // Р›РѕРєР°Р»СЊРЅР°СЏ Р°РјРїР»РёС‚СѓРґР°: РјР°РєСЃРёРјСѓРј РІ tClick, Р·Р°С‚СѓС…Р°РЅРёРµ Рє РєРѕРЅС†Р°Рј
                // РЎРѕР·РґР°РµРј РЅРµСЃРєРѕР»СЊРєРѕ РІРѕР»РЅ (waveCount РїРѕР»СѓРІРѕР»РЅ) Рё РѕРіСЂР°РЅРёС‡РёРІР°РµРј РёС… РїР»Р°РІРЅРѕР№ РіР°СѓСЃСЃРѕРІРѕР№ "С€Р°РїРєРѕР№"
                const waveCount = settings.waveCount ?? 4;
                const localAmp = node.vibrationAmplitude * Math.sin(waveCount * Math.PI * t) * Math.exp(-decayAlpha * Math.pow(t - tClick, 2)) * Math.sin(2 * Math.PI * settings.vibrationFrequency * time) * decay;
                // РћС‚РєР»СЋС‡Р°РµРј Р·Р°Р»РёРІРєСѓ РґР»СЏ РІРѕР»РЅС‹
                if (i === 0) p.noFill();
                p.vertex(x + nx * localAmp, y + ny * localAmp);
              }
              p.endShape();
              // Р—Р°С‚СѓС…Р°РЅРёРµ Р°РјРїР»РёС‚СѓРґС‹
              node.vibrationAmplitude *= settings.vibrationDecay;
              if (node.vibrationAmplitude < 0.1) node.isVibrating = false;
            } else {
              // РџСЂРѕСЃС‚Рѕ Р»РёРЅРёСЏ Р±РµР· РІРѕР»РЅС‹
              p.line(node.position.x, node.position.y, endPoint.x, endPoint.y);
            }
          }
        }
      }

      // --- Р’СЃРїРѕРјРѕРіР°С‚РµР»СЊРЅР°СЏ С„СѓРЅРєС†РёСЏ: СЂР°СЃСЃС‚РѕСЏРЅРёРµ РѕС‚ С‚РѕС‡РєРё РґРѕ РѕС‚СЂРµР·РєР° ---
      function pointToSegmentDist(px: number, py: number, x1: number, y1: number, x2: number, y2: number) {
        // РђР»РіРѕСЂРёС‚Рј: РїСЂРѕРµРєС†РёСЏ С‚РѕС‡РєРё РЅР° РѕС‚СЂРµР·РѕРє
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
        // --- Р”Р»СЏ РІРёР±СЂР°С†РёРё Р»СѓС‡Р° ---
        isVibrating: boolean = false; // РђРєС‚РёРІРЅР° Р»Рё РІРёР±СЂР°С†РёСЏ
        vibrationAmplitude: number = 0; // РўРµРєСѓС‰Р°СЏ Р°РјРїР»РёС‚СѓРґР°
        vibrationStartTime: number = 0; // Р’СЂРµРјСЏ Р·Р°РїСѓСЃРєР° РІРёР±СЂР°С†РёРё
        vibrationClickT?: number; // РџРѕР»РѕР¶РµРЅРёРµ РєР»РёРєР° РІРґРѕР»СЊ Р»СѓС‡Р° (0..1)
      
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
            this.velocity.mult(settings.majorNodeMobility); // РЈСЃРїРѕРєР°РёРІР°РµРј РѕСЃРЅРѕРІРЅС‹Рµ СѓР·Р»С‹
          }
          this.position.add(this.velocity);
          this.acceleration.mult(0);
        }

        display() {
          const z = this.position.z;
          const radius = p.map(z, -settings.zDepth, settings.zDepth, settings.minNodeRadius, settings.maxNodeRadius);
          const alpha = p.map(z, -settings.zDepth, settings.zDepth, 100, 255);
          p.noStroke();
          // РСЃРїРѕР»СЊР·СѓРµРј majorNodeColor РґР»СЏ РѕСЃРЅРѕРІРЅС‹С… СѓР·Р»РѕРІ
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
    <div className="dynamic-bg" style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0, opacity: 0.7, pointerEvents: "auto" }}>
      {/* РљРѕРЅС‚РµР№РЅРµСЂ РґР»СЏ p5-СЃРєРµС‚С‡Р° */}
      <div ref={sketchRef} style={{ width: "100vw", height: "100vh" }} />
    </div>
  );
}

// Конфиг для динамического фона (p5)
// Цвета берутся из CSS custom properties (globals.css)

function cssVarToRgbArray(varName: string, fallback: [number, number, number]): [number, number, number] {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  if (!value) return fallback;
  // Поддержка hex и rgb(a)
  if (value.startsWith("#")) {
    // hex -> rgb
    const hex = value.replace("#", "");
    const bigint = parseInt(hex, 16);
    if (hex.length === 6) {
      return [
        (bigint >> 16) & 255,
        (bigint >> 8) & 255,
        bigint & 255,
      ];
    }
    if (hex.length === 3) {
      return [
        ((bigint >> 8) & 15) * 17,
        ((bigint >> 4) & 15) * 17,
        (bigint & 15) * 17,
      ];
    }
  }
  if (value.startsWith("rgb")) {
    const arr = value.match(/\d+/g);
    if (arr && arr.length >= 3) {
      return [parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2])];
    }
  }
  return fallback;
}

// Функция для получения цветов из CSS
function getBgConfigColors() {
  return {
    nodeColor: cssVarToRgbArray("--color-primary", [40, 60, 80]), // Цвет обычных узлов (primary)
    majorNodeColor: cssVarToRgbArray("--color-accent", [255, 110, 58]), // Цвет основных узлов (accent)
    bgColor: cssVarToRgbArray("--color-bg", [245,247,250]), // Цвет фона (но фон прозрачный, используется фон страницы)
    connectionLineColor: cssVarToRgbArray("--color-primary", [100, 120, 140]), // Цвет линий соединения (primary)
    rayLineColor: cssVarToRgbArray("--color-primary", [80, 100, 120]), // Цвет лучей (primary)
  };
}

const defaultColors = getBgConfigColors();

const bgConfig = {
  numNodes: 35, // Количество узлов
  numMajorNodes: 5, // Количество основных узлов
  nodeColor: defaultColors.nodeColor, // Цвет обычных узлов
  majorNodeColor: defaultColors.majorNodeColor, // Цвет основных узлов (accent)
  bgColor: defaultColors.bgColor, // Цвет фона (но фон прозрачный, используется фон страницы)
  springStiffness: 0.0005, // Жесткость пружины
  damping: 0.03, // Коэффициент демпфирования
  tetherStrength: 0.01, // Сила привязки к основным узлам
  maxSpeed: 3.0, // Максимальная скорость движения узлов
  restLength: 120, // Длина покоя пружин
  zDepth: 200, // Глубина по оси Z для 3D эффекта
  minNodeRadius: 2, // Минимальный радиус узла
  maxNodeRadius: 7, // Максимальный радиус узла
  minLineWeight: 0.5, // Минимальная толщина линии соединения
  maxLineWeight: 2.5, // Максимальная толщина линии соединения
  connectionLineColor: defaultColors.connectionLineColor, // Цвет линий соединения
  rayLineColor: defaultColors.rayLineColor, // Цвет лучей
  hitThreshold: 10, // Порог для попадания по линии (пиксели)
  impulseStrength: 0.5, // Сила импульса при взаимодействии с узлами (чем выше, тем сильнее отталкивание)
  vibrationAmplitude: 8, // Амплитуда вибрации узлов (чем выше, тем сильнее вибрация)
  vibrationFrequency: 100, // Частота вибрации узлов (чем выше, тем быстрее вибрация)
  vibrationDecay: 0.99, // Коэффициент затухания вибрации (чем меньше, тем быстрее затухает)
  transparentBg: true, // Новый параметр — фон прозрачный, используется фон страницы
  // --- Новые параметры для волны ---
  waveDecayAlpha: 60, // "короткость" волны (затухание) (чем меньше, тем быстрее затухает)
  waveCount: 20,       // число полуволн (частота) (чем больше, тем чаще волны)
  rayLength: 2000, // Длина луча основных узлов
  majorNodeMobility: 0.4, // Насколько свободно движутся основные узлы (0..1)
  clusterRadiusFactor: 0.25, // Радиус кластера (доля от min(width,height))
  clusterForce: 0.002,       // Сила стягивающая узлы к центру
  tetherRadiusFactor: 0.22,  // Радиус для точек привязки основных узлов
};

export function getDynamicBgConfig() {
  const colors = getBgConfigColors();
  return {
    ...bgConfig,
    nodeColor: colors.nodeColor,
    majorNodeColor: colors.majorNodeColor,
    bgColor: colors.bgColor,
    connectionLineColor: colors.connectionLineColor,
    rayLineColor: colors.rayLineColor,
  };
}

export default bgConfig;
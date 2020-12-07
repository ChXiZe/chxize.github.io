import { G2 } from '@antv/g2plot';

type Point = { x: number; y: number };

G2.registerShape('interval', 'waterdrop', {
  draw(shapeInfo: any, container: any) {
    const getDistance = (p1: Point, p2: Point) => {
      const pow = (x: number) => x * x;
      return Math.sqrt(pow(p1.x - p2.x) + pow(p1.y - p2.y));
    };
    const center = (this as any).coordinate.getCenter();
    const points = shapeInfo.points.map((p: Point) =>
      (this as any).parsePoint(p),
    );
    const distance = getDistance(points[1], points[2]);
    const waterdrop = container.addShape({
      type: 'path',
      attrs: {
        path: [
          ['M', points[2].x, points[2].y],
          ['L', center.x, center.y],
          ['L', points[1].x, points[1].y],
          ['A', distance / 2, distance / 2, 0, 1, 1, points[2].x, points[2].y],
          ['L', points[2].x, points[2].y],
          ['Z'],
        ],
        // todo 优化颜色
        fill: shapeInfo.color,
        stroke: shapeInfo.style?.stroke,
      },
    });
    waterdrop.animate(
      {
        strokeOpacity: 0.8,
        fillOpacity: 0.75,
      },
      {
        duration: 1500,
        easing: 'easeLinear',
        repeat: true,
      },
    );
    return container;
  },
});
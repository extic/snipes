import { setScreenWidthAndHeight } from ".";

export function activateResizeObserver(canvas: HTMLCanvasElement) { 
  const resizeObserver = new ResizeObserver((e: ResizeObserverEntry[]) => {
    canvas.width = e[0].contentBoxSize[0].inlineSize;
    canvas.height = e[0].contentBoxSize[0].blockSize;

    const screenWidth = Math.floor(e[0].contentBoxSize[0].inlineSize / 30);
    const screenHeight = Math.floor(e[0].contentBoxSize[0].blockSize / 30);

    const drawStartX = Math.floor((canvas.width - screenWidth * 30) / 2);
    const drawStartY = Math.floor((canvas.height - screenHeight * 30) / 2);

    setScreenWidthAndHeight(screenWidth, screenHeight, drawStartX, drawStartY);

    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = '#7a787c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });
  resizeObserver.observe(document.getElementsByTagName('canvas')[0]);
}

import { computed, ref } from "vue";
import gsap from "gsap";

export const COLUMNS = 10;
export const ROWS = 18;

// index 0 is the empty cell, the rest double as the css modifier for each piece
export const PIECE_NAMES = ["", "i", "o", "t", "s", "z", "j", "l"] as const;

type Rotation = number[][];

// every piece is a list of its rotations, each one a list of [x, y] offsets
const PIECES: Rotation[][] = [
  // I
  [
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
    ],
  ],
  // O
  [
    [
      [1, 0],
      [2, 0],
      [1, 1],
      [2, 1],
    ],
  ],
  // T
  [
    [
      [1, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [2, 1],
      [1, 2],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [1, 2],
    ],
    [
      [1, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
  ],
  // S
  [
    [
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [2, 1],
      [2, 2],
    ],
  ],
  // Z
  [
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
    [
      [2, 0],
      [1, 1],
      [2, 1],
      [1, 2],
    ],
  ],
  // J
  [
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [2, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [2, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [0, 2],
      [1, 2],
    ],
  ],
  // L
  [
    [
      [2, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [0, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
  ],
];

const LINE_SCORES = [0, 100, 300, 500, 800];
const BASE_STEP = 0.8;
const MIN_STEP = 0.12;

type ActivePiece = { piece: number; rotation: number; x: number; y: number };

const createBoard = () => Array.from({ length: ROWS }, () => new Array<number>(COLUMNS).fill(0));

export const useTetris = () => {
  const board = ref(createBoard());
  const active = ref<ActivePiece | null>(null);
  const nextPiece = ref(1);
  const score = ref(0);
  const lines = ref(0);
  const isRunning = ref(false);
  const isPaused = ref(false);
  const isGameOver = ref(false);
  const clearingRows = ref<number[]>([]);

  let elapsed = 0;
  // a shuffled bag, so you never wait forever for the piece you need
  let bag: number[] = [];

  const level = computed(() => Math.floor(lines.value / 8) + 1);
  const step = computed(() => Math.max(MIN_STEP, BASE_STEP - (level.value - 1) * 0.08));

  const pullFromBag = () => {
    if (!bag.length) {
      bag = [1, 2, 3, 4, 5, 6, 7];
      for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag[i], bag[j]] = [bag[j] as number, bag[i] as number];
      }
    }
    return bag.pop() as number;
  };

  const cellsOf = (piece: ActivePiece) => {
    const rotations = PIECES[piece.piece - 1] as Rotation[];
    const offsets = rotations[piece.rotation % rotations.length] as number[][];
    return offsets.map(([x, y]) => [piece.x + (x as number), piece.y + (y as number)] as const);
  };

  const collides = (piece: ActivePiece) =>
    cellsOf(piece).some(([x, y]) => {
      if (x < 0 || x >= COLUMNS || y >= ROWS) return true;
      if (y < 0) return false;
      return (board.value[y] as number[])[x] !== 0;
    });

  const spawn = () => {
    // spawns inside the board rather than above it, so a new piece is visible
    // straight away instead of falling in from nowhere
    const piece: ActivePiece = { piece: nextPiece.value, rotation: 0, x: 3, y: 0 };
    nextPiece.value = pullFromBag();

    if (collides(piece)) {
      active.value = null;
      isGameOver.value = true;
      isRunning.value = false;
      return;
    }

    active.value = piece;
  };

  const lockPiece = () => {
    const piece = active.value;
    if (!piece) return;

    for (const [x, y] of cellsOf(piece)) {
      if (y < 0) {
        isGameOver.value = true;
        isRunning.value = false;
        active.value = null;
        return;
      }
      (board.value[y] as number[])[x] = piece.piece;
    }

    const full = board.value.reduce<number[]>((rows, row, index) => {
      if (row.every((cell) => cell !== 0)) rows.push(index);
      return rows;
    }, []);

    if (full.length) {
      clearingRows.value = full;
      board.value = board.value.filter((_, index) => !full.includes(index));
      while (board.value.length < ROWS) board.value.unshift(new Array<number>(COLUMNS).fill(0));
      lines.value += full.length;
      score.value += (LINE_SCORES[full.length] ?? 0) * level.value;
      window.setTimeout(() => (clearingRows.value = []), 180);
    }

    active.value = null;
    spawn();
  };

  const tryMove = (dx: number, dy: number, dRotation = 0) => {
    const piece = active.value;
    if (!piece || !isRunning.value || isPaused.value) return false;

    const rotations = PIECES[piece.piece - 1] as Rotation[];
    const candidate: ActivePiece = {
      piece: piece.piece,
      rotation: (piece.rotation + dRotation) % rotations.length,
      x: piece.x + dx,
      y: piece.y + dy,
    };

    if (!collides(candidate)) {
      active.value = candidate;
      return true;
    }

    // wall kick: a rotation that clips the wall is nudged back in
    if (dRotation !== 0) {
      for (const kick of [-1, 1, -2, 2]) {
        const kicked = { ...candidate, x: candidate.x + kick };
        if (!collides(kicked)) {
          active.value = kicked;
          return true;
        }
      }
    }

    return false;
  };

  const drop = () => {
    if (!tryMove(0, 1)) lockPiece();
  };

  const tick = () => {
    if (!isRunning.value || isPaused.value) return;
    elapsed += gsap.ticker.deltaRatio(60) / 60;
    if (elapsed < step.value) return;
    elapsed = 0;
    drop();
  };

  /* --- controls --- */

  const moveLeft = () => tryMove(-1, 0);
  const moveRight = () => tryMove(1, 0);
  const rotate = () => tryMove(0, 0, 1);

  const softDrop = () => {
    if (tryMove(0, 1)) {
      score.value += 1;
      elapsed = 0;
    }
  };

  const hardDrop = () => {
    if (!active.value || !isRunning.value || isPaused.value) return;
    while (tryMove(0, 1)) score.value += 2;
    lockPiece();
    elapsed = 0;
  };

  const togglePause = () => {
    if (!isRunning.value) return;
    isPaused.value = !isPaused.value;
  };

  const start = () => {
    board.value = createBoard();
    clearingRows.value = [];
    score.value = 0;
    lines.value = 0;
    elapsed = 0;
    bag = [];
    isGameOver.value = false;
    isPaused.value = false;
    isRunning.value = true;
    nextPiece.value = pullFromBag();
    spawn();
  };

  const stop = () => {
    isRunning.value = false;
    isPaused.value = false;
    active.value = null;
  };

  /* --- rendering --- */

  // the settled board plus the piece in flight, as one flat list for the grid
  const cells = computed(() => {
    const flat = board.value.map((row) => [...row]);
    const piece = active.value;

    if (piece) {
      for (const [x, y] of cellsOf(piece)) {
        if (y >= 0 && y < ROWS && x >= 0 && x < COLUMNS) (flat[y] as number[])[x] = piece.piece;
      }
    }

    return flat.flat();
  });

  const nextCells = computed(() => {
    const grid = new Array<number>(16).fill(0);
    const rotations = PIECES[nextPiece.value - 1] as Rotation[];
    for (const [x, y] of rotations[0] as number[][]) {
      grid[(y as number) * 4 + (x as number)] = nextPiece.value;
    }
    return grid;
  });

  gsap.ticker.add(tick);

  const destroy = () => {
    gsap.ticker.remove(tick);
    stop();
  };

  return {
    cells,
    nextCells,
    score,
    lines,
    level,
    isRunning,
    isPaused,
    isGameOver,
    clearingRows,
    start,
    stop,
    destroy,
    moveLeft,
    moveRight,
    rotate,
    softDrop,
    hardDrop,
    togglePause,
  };
};

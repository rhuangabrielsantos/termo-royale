import { KeyEnum } from '../enums/KeyEnum';

export class keyboardService {
  public static getKeyEnumByKey(key: string): number {
    switch (key) {
      case 'a':
        return KeyEnum.A;
      case 'b':
        return KeyEnum.B;
      case 'c':
        return KeyEnum.C;
      case 'd':
        return KeyEnum.D;
      case 'e':
        return KeyEnum.E;
      case 'f':
        return KeyEnum.F;
      case 'g':
        return KeyEnum.G;
      case 'h':
        return KeyEnum.H;
      case 'i':
        return KeyEnum.I;
      case 'j':
        return KeyEnum.J;
      case 'k':
        return KeyEnum.K;
      case 'l':
        return KeyEnum.L;
      case 'm':
        return KeyEnum.M;
      case 'n':
        return KeyEnum.N;
      case 'o':
        return KeyEnum.O;
      case 'p':
        return KeyEnum.P;
      case 'q':
        return KeyEnum.Q;
      case 'r':
        return KeyEnum.R;
      case 's':
        return KeyEnum.S;
      case 't':
        return KeyEnum.T;
      case 'u':
        return KeyEnum.U;
      case 'v':
        return KeyEnum.V;
      case 'w':
        return KeyEnum.W;
      case 'x':
        return KeyEnum.X;
      case 'y':
        return KeyEnum.Y;
      case 'z':
        return KeyEnum.Z;
      default:
        return 999;
    }
  }
}

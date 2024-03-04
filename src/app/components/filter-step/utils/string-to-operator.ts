import {Operator} from "../enums/operator.enum";

export function StringToOperator(operator: string): Operator {
  return Operator[operator as keyof typeof Operator];
}

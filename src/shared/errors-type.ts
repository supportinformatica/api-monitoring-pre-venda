export interface DomainError {
  message: string;
}

export type AppError = DomainError;

export type ControllerError = DomainError;

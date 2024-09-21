declare module "poll-server-check" {
  export function clientCheck(BackendUrl: string): void;
  export function serverCheck(app: any): void;
}

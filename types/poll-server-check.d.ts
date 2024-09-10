declare module "poll-server-check" {
  export function clientPoll(BackendUrl: string): void;
  export function serverCheck(app: any): void;
}

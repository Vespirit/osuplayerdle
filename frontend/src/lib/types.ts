export type PlayerProps = {
    _id: number,
    username: string,
    country: string,
    rank: number,
    playcount: number
}
  
export type PlayerLookup = Map<string, PlayerProps>;

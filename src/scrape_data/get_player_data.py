from ossapi import Ossapi

def scrape():
    api = Ossapi(27775,'st6eOb5G6OfGBSwyo8TlfzlIj4U2SuD5ifCRhq4f')
    ranking = api.ranking('osu', 'performance').ranking

    with open('src/scrape_data/data.csv', 'w') as file:
        for player in ranking:
            file.write(str(player.user.id) + ",")
            file.write(player.user.username + ",")
            file.write(player.user.country_code + ",")
            file.write(str(player.global_rank) + ",")
            file.write(str(player.play_count) + "\n")

def fix():
    with open('src/scrape_data/data.csv', 'r') as f:
        lines = f.readlines()
        data = []
        for line in lines:
            data.append(line.split(','))
    
    with open('src/scrape_data/solutions.tsx', 'w') as f:
        f.write('export const SOLUTIONS = [' + '\n')
        for player in data:
            f.write(player[0] + ',\n')
        f.write(']\n')

if __name__ == '__main__':
    fix()
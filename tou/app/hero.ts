export class Hero {
    id: number;
    name: String;
    $key: String;
    name_search:String;

    public static prepareForSearch(hero:Hero): Hero {
        hero = JSON.parse(JSON.stringify(hero));
        hero.name_search=hero.name.toLocaleLowerCase();
        delete(hero.$key);
        return hero;
    }
}

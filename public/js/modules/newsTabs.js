function lastNews() {
    
    // Последние новости (табы)
    class TabItem {
        constructor(src, data, title, parentSelector, ...classes) {
            this.src = src;
            this.data = data;
            this.title = title;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
        }
        convert() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'tabItem';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
                <div class="tabItem__pseudoButton">
                    <div>
                        <b class="read">Читать</b>
                        <b class="active">Текущая</b>
                            новость
                    </div>
                </div>
                <img src=${this.src}>
                <div class="box">
                    <div class="box__data">
                        ${this.data}
                    </div>
                    <div class="box__descr">
                        ${this.title} 
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new TabItem(
        'images/tabs/mario-s.png',
        '14 Июня 2025',
        'Объявлено начало работы над сиквелом!',
        '.lastNews .tabcontainer'
    ).convert();

    new TabItem(
        'images/tabs/minecraft-s.png',
        '15 Июня 2025',
        'Фильм про Minecraft уже в кинотеатрах!',
        '.lastNews .tabcontainer'
    ).convert();

    new TabItem(
        'images/tabs/druk-s.png',
        '13 Июня 2025',
        'Леонардо ДиКаприо сыграет главную роль в ремейке «Еще по одной»',
        '.lastNews .tabcontainer'
    ).convert();

    new TabItem(
        'images/tabs/english-s.png',
        '13 Июня 2025',
        'Аткинсон вернётся в новой части «Джонни Инглиша»',
        '.lastNews .tabcontainer'
    ).convert();

    // Последние новости (контент табов)
    class TabActive extends TabItem {
        constructor(src, data, view, title, descr, parentSelector, ...classes) {
            super(src, data, title, parentSelector, ...classes);
            this.view = view;
            this.descr = descr;
        }
        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'tabcontent';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
                <img class="tabActiveImg" src=${this.src}>
                <div class="box">
                    <div class="box__data">
                        <span>${this.data}</span>
                        <div class="i"><i class="fa-regular fa-eye"></i></div>
                        <span>${this.view}</span>
                    </div>
                    <div class="box__descr">
                        <div class="title">
                            ${this.title} 
                        </div>
                        <div class="descr">
                            ${this.descr}
                        </div>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new TabActive(
        'images/tabs/mario-b.png',
        '14 Июня 2025',
        '452',
        'Объявлено начало работы над сиквелом!',
        'В честь Дня Марио 2024 Nintendo и Illumination объявили, что новые "Братья Супер Марио в кино" официально находится в разработке и выйдет 3 апреля 2026 года. Хотя информации было немного, было подтверждено, что режиссеры "Братьев Супер Марио в кино Аарон Хорват и Майкл Джеленик вернутся для нового мультфильма и что анимация проекта начнется в ближайшее время.',
        '.lastNews .lastNewsTabs'
    ).render();

    new TabActive(
        'images/tabs/minecraft-b.png',
        '15 Июня 2025',
        '242',
        'Фильм про Minecraft уже в кинотеатрах!',
        'Компания Mojang запустила показ фильма по своей игре, над которым работала с 2014 года! "Отправляйтесь в приключение, в котором есть всё из вашей любимой игры."',
        '.lastNews .lastNewsTabs'
    ).render();

    new TabActive(
        'images/tabs/druk-b.png',
        '13 Июня 2025',
        '98',
        'Леонардо ДиКаприо сыграет главную роль в ремейке «Еще по одной»',
        'Компания Леонардо ДиКаприо Appian Way приобрела на аукционе права на ремейк датской драмы Томаса Винтерберга «Еще по одной». Новость стала известна в день, когда лента получила «Оскар» как лучший международный фильм.',
        '.lastNews .lastNewsTabs'
    ).render();

    new TabActive(
        'images/tabs/english-b.png',
        '13 Июня 2025',
        '154',
        'Аткинсон вернётся в новой части «Джонни Инглиша»',
        'Четвертая часть шпионской комедии «Джонни Инглиша» с Роуэном Аткинсоном в главной роли начнет сниматься на Мальте и в Великобритании в июне. Сюжет пока держится в секрете, но Аткинсон вернется в роли неумелого агента MI7.',
        '.lastNews .lastNewsTabs'
    ).render();
};
export default lastNews;
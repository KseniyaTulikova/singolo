window.onload = function () {
    navBarHandler();
    goHomeHandler();
    decorateProjectHandler();
    addClassToFiltrationBtn();
    sliderBtnHandler();
    modalBoxHandler();
    scrollHandler();
    navigationAnchorHandler();
}

//Block of functions for header 
const navigationAnchorHandler = () => {
    let navAhchors = document.querySelectorAll('.navigation-bar > li > a');
    navAhchors.forEach(anchor => {

        anchor.addEventListener('click', (event) => {
            event.preventDefault();

            let anchorSelectorName = event.target.getAttribute('href');
            let anchorOffsetTop = document.querySelector(anchorSelectorName).offsetTop;
            window.scrollTo(0, anchorOffsetTop);
        });
    }

    );
}

const navBarHandler = () => {
    let navBar = document.querySelector('.navigation-bar');
    navBar.addEventListener('click', (e) => {
        addClassToNavBar(e, navBar);
    });
}

const removeClassFromElement = (nameOfClass, elements) => {
    elements.forEach(child => child.classList.remove(nameOfClass));
}

const addClassToNavBar = (event, collectionOfElems) => {
    let allChildsOfElement = collectionOfElems.querySelectorAll('.navigation-bar .item');

    removeClassFromElement('clicked-page', allChildsOfElement);

    event.target.parentNode.classList.add('clicked-page');
}

// Block of functions for Slider Home Button 

const goHomeHandler = () => {
    document.querySelectorAll('.button-home').forEach(elem => {
        elem.addEventListener('click', (e) => {
            e.target.previousElementSibling.classList.toggle('button-home-clicked');
        })
    }
    );
}

const goHome = (e) => {
    e.target.previousElementSibling.classList.toggle('button-home-clicked');
}



// Block of functions for Portfolio 
const addClassToFiltrationBtn = () => {
    let filtrationBtns = document.querySelector('.filter-of-projects');
    filtrationBtns.addEventListener('click', (e) => {
        let allButtons = document.querySelectorAll('.filter-of-projects [type="button"]');
        let allProjects = document.querySelectorAll('.projects .project-img');

        removeClassFromElement('active', allButtons);
        removeClassFromElement('non-active-project', allProjects);

        if (e.target.dataset.filter != 'all') {
            showProjects(e.target.dataset.filter, allProjects);
        }

        e.target.classList.add('active');
    });
}

const decorateProjectHandler = () => {
    document.querySelectorAll('.projects .project-img').forEach(elem => {
        elem.addEventListener('click', (e) => {
            let allProjects = document.querySelectorAll('.projects .project-img');
            removeClassFromElement('decoratedProject', allProjects);
            e.target.classList.add('decoratedProject');
        })
    }
    );
}
const showProjects = (filtrationClass, allProjects) => {
    allProjects.forEach(project => {
        if (!(project.classList.contains(filtrationClass))) {
            project.classList.add('non-active-project');
        }
    });
}
// Block of functions for Slider 
const sliderBtnHandler = () => {
    let slider = new Slider(document.querySelector(".slider"));

    document.querySelector('.right-chevron').addEventListener('click', slider.next);
    document.querySelector('.left-chevron').addEventListener('click', slider.prev);
}

class Slider {
    constructor(slider) {
        // this.slides = slides;
        this.container = slider.querySelector('.slider-container');
        this.width = slider.offsetWidth;
        this.slides = this.container.querySelectorAll('.slide');
        this.size = this.slides.length - 2;

        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.removeActiveSlide = this.removeActiveSlide.bind(this);
    }

    next() {

        let positionOfActiveSlide = this.removeActiveSlide();

        let positionOfNextActiveSlide = (positionOfActiveSlide < this.size) ? positionOfActiveSlide + 1 : 1;
        this.slides[positionOfNextActiveSlide].classList.add('active');

        if (positionOfActiveSlide == this.size) {
            this.container.style.transition = 'none';
            this.container.style.left = '0px';
            this.container.offsetWidth; //triggerLayout
            this.container.style.transition = '';
        }

        this.container.style.left = `${this.container.offsetLeft - this.width}px`;


    }

    prev() {
        let positionOfActiveSlide = this.removeActiveSlide();

        let positionOfNextActiveSlide = (positionOfActiveSlide > 1) ? positionOfActiveSlide - 1 : this.size + 1;
        this.slides[positionOfNextActiveSlide].classList.add('active');

        if (positionOfActiveSlide == 1) {
            this.container.style.transition = 'none';
            this.container.style.left = `${-this.width * (this.size + 1)}px`;
            this.container.offsetWidth; //triggerLayout
            this.container.style.transition = '';
        }

        this.container.style.left = `${this.container.offsetLeft + this.width}px`;

    }

    findPositionOfActiveSlide() {
        for (let i = 0; i < this.slides.length; i++) {
            if (this.slides[i].classList.contains('active')) {
                return i;
            }
        }
    }

    removeActiveSlide() {
        let positionOfActiveSlide = this.findPositionOfActiveSlide();
        this.slides[positionOfActiveSlide].classList.remove('active');

        return positionOfActiveSlide;
    }
}

// Block of functions for Get A Quote 

const modalBoxHandler = () => {
    document.querySelector('.modal-box').addEventListener('click', (e) => {
        if (e.target.classList.contains("ok-btn")) {
            claerAllModalForm();
            toggleModalBox();
            resetForm();
        }
    });
}

const formHandler = () => {
    let form = document.forms['get-a-quote-form'];
    let box = document.createElement('div');
    box.className = 'box-answer-container';

    let boxAnswer = document.createElement('div');
    box.innerHTML = "<h3>Письмо отправлено</h3>";

    for (let i = 0; i < form.elements.length; i++) {
        let answer = form.elements[i];


        switch (answer.name) {
            case "subject":
                boxAnswer.innerHTML += (answer.value) ? `<div>Тема: ${answer.value}</div>` : "<div>Без темы</div>";
                break;
            case "description":
                boxAnswer.innerHTML += (answer.value) ? `<div>Описание: ${answer.value}</div>` : "<div>Без описания</div>";
                break;
            default:
        }
        box.appendChild(boxAnswer);
    }

    document.querySelector('.modal-box').prepend(box);
    toggleModalBox();


    return false;
}

const toggleModalBox = () => {
    document.querySelector('.modal-box').classList.toggle('activate-modal-box');
}
const claerAllModalForm = () => {
    document.querySelector('.box-answer-container').innerHTML = '';
}

const resetForm = () => {
    return document.forms['get-a-quote-form'].reset();
}

const scrollHandler = () => {
    let navBar = document.querySelector('.navigation-bar');
    let navItems = navBar.querySelectorAll(".item");
    let info = document.body.querySelectorAll('.scroll-point');
    let navItemInfo = new Array();

    info.forEach(item => {
        let info = {};
        info.id = item.id;
        info.start = item.offsetTop;
        info.ends = `${info.start + item.offsetHeight}`;
        navItemInfo.push(info);
    });

    window.addEventListener('scroll', (e) => {

        removeClassFromElement('clicked-page', navItems);

        let scrollPosition = e.currentTarget.pageYOffset;
        navItemInfo.forEach(item => {
            if (item.start <= scrollPosition && item.ends > scrollPosition) {
                navBar.querySelector(`li > a[href='#${item.id}']`).parentElement.classList.add('clicked-page');
            }
        })
        switch (e.currentTarget.pageYOffset) {
            case 100:
        }
    })

};
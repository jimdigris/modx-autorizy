'use strict';

(function () {
    class Authorization {
        #element_classes = {                                                                        // классы элементов формы
            input_login: '.j-lk-login',
            input_pass: '.j-lk-pass',
            input_check: '.j-lk-save',
            btn_enter: '.j-lk-btn',
            message: '.j-lk-message',
        }

        #elements = {                                                                               // элементы формы
            input_login: null,
            input_pass: null,
            input_check: null,
            btn_enter: null,
            message: null,
        }

        #data = {
            cookie_name: 'ctrhtnysqrtq',                                                            // имя куки с идентификатором авторизации
            login: null,                                                                            // логин, введенный пользователем
            pass: null,                                                                             // пароль, введенный пользователем
            check: null,                                                                            // чекбокс "запомнить на этом устр."
        }




        // ! активация авторизации
        activation() {
            if (!this.#get_cookie()) {                                                                  // ** 1 - если куки с подтверждением прошлой авторизации нет, то
                this.#get_form_elements();                                                              // ** 2 - получить элементы формы авторизации 
                this.#elements.btn_enter.addEventListener('click', (e) => { this.#click_btn(e); })      // ** 3 - обработать нажатие кн Войти в форме                  
            }
        }


        // ! получить куки с идентификатором авторизации
        #get_cookie() {
            let matches = document.cookie.match(new RegExp("(?:^|; )" + this.#data.cookie_name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        }

        // ! получить элементы формы авторизации
        #get_form_elements() { for (let key in this.#element_classes) { this.#elements[key] = document.querySelector(this.#element_classes[key]); } }

        // ! нажали кн Войти в форме
        async #click_btn(e) {
            e.preventDefault();
            this.#data.login = this.#elements.input_login.value;                                    // получить логин                                 
            this.#data.pass = this.#elements.input_pass.value;                                      // получить пароль            
            this.#data.check = this.#elements.input_check.checked ? true : false;                   // получить статус чекбокса "запомнить на этом устр."

            let key = await this.#perform_verification();                                           // ** 4 - выполнить верификацию и получить результат

            if (key) {                                                                              // если авторизация успешна            
                this.#set_cookie(key, this.#data.check);                                            // ** 5 - установить куки, что авторизация успешна (если чекбокс отмечен, то на год, если нет, то до закрытия браузера)
                location.reload();                                                                  // перезагрузить страницу
            } else {                                                                                // если авторизация НЕ успешна  
                this.#elements.message.innerText = 'Логин или пароль не верны!';                    // вывести сообщение о не верных данных
            }
        }

        // ! выполнить верификацию
        #perform_verification() {
            return new Promise((resolve) => {
                let xhr = new XMLHttpRequest();                                                     // создаем экземпляр класса XMLHttpRequest 
                let request = `login=${this.#data.login}&pass=${this.#data.pass}`;                  // формируем запрос
                xhr.onreadystatechange = () => {                                                    // когда запрос завершен и ответ готов
                    if (xhr.readyState === 4) { resolve(xhr.response); }                            // вернуть результат (созданно / не созданно)
                }
                xhr.open('POST', '/lk-verification');                                               // указываем параметры соединения
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');          // формируем заголовок
                xhr.responseType = 'json';                                                          // получаем json
                xhr.send(request);                                                                  // отправляем запрос 
            });
        }

        // ! создать куки с идентификатором авторизации
        #set_cookie(value, checkbox) {
            if (checkbox) { document.cookie = `${this.#data.cookie_name} = ${value}; max-age=31556926`; }       // на год
            else { document.cookie = `${this.#data.cookie_name} = ${value}`; }                                  // до закрытия браузера
        }
    }

    let authorize = new Authorization();
    authorize.activation();
})();

angular.module("appServer").controller("workController", ['$scope', '$http', '$mdDialog', '$window', '$timeout', 'workServices','$compile','$location','$anchorScroll',
    function ($scope, $http, $mdDialog, $window, $timeout, workServices,$compile, $location, $anchorScroll) {


        $scope.resultWorksType={};

        getDescription();
        $scope.customFullscreen = false;
        $scope.allIcons = ["fa-address-book", "fa-address-book-o", "fa-address-card", "fa-address-card-o", "fa-adjust", "fa-adn", "fa-align-center", "fa-align-justify", "fa-align-left", "fa-align-right", "fa-amazon", "fa-ambulance", "fa-american-sign-language-interpreting", "fa-anchor", "fa-android", "fa-angellist", "fa-angle-double-down", "fa-angle-double-left", "fa-angle-double-right", "fa-angle-double-up", "fa-angle-down", "fa-angle-left", "fa-angle-right", "fa-angle-up", "fa-apple", "fa-archive", "fa-area-chart", "fa-arrow-circle-down", "fa-arrow-circle-left", "fa-arrow-circle-o-down", "fa-arrow-circle-o-left", "fa-arrow-circle-o-right", "fa-arrow-circle-o-up", "fa-arrow-circle-right", "fa-arrow-circle-up", "fa-arrow-down", "fa-arrow-left", "fa-arrow-right", "fa-arrow-up", "fa-arrows", "fa-arrows-alt", "fa-arrows-h", "fa-arrows-v", "fa-asl-interpreting", "fa-assistive-listening-systems", "fa-asterisk", "fa-at", "fa-audio-description", "fa-automobile", "fa-backward", "fa-balance-scale", "fa-ban", "fa-bandcamp", "fa-bank", "fa-bar-chart", "fa-bar-chart-o", "fa-barcode", "fa-bars", "fa-bath", "fa-bathtub", "fa-battery", "fa-battery-0", "fa-battery-1", "fa-battery-2", "fa-battery-3", "fa-battery-4", "fa-battery-empty", "fa-battery-full", "fa-battery-half", "fa-battery-quarter", "fa-battery-three-quarters", "fa-bed", "fa-beer", "fa-behance", "fa-behance-square", "fa-bell", "fa-bell-o", "fa-bell-slash", "fa-bell-slash-o", "fa-bicycle", "fa-binoculars", "fa-birthday-cake", "fa-bitbucket", "fa-bitbucket-square", "fa-bitcoin", "fa-black-tie", "fa-blind", "fa-bluetooth", "fa-bluetooth-b", "fa-bold", "fa-bolt", "fa-bomb", "fa-book", "fa-bookmark", "fa-bookmark-o", "fa-braille", "fa-briefcase", "fa-btc", "fa-bug", "fa-building", "fa-building-o", "fa-bullhorn", "fa-bullseye", "fa-bus", "fa-buysellads", "fa-cab", "fa-calculator", "fa-calendar", "fa-calendar-check-o", "fa-calendar-minus-o", "fa-calendar-o", "fa-calendar-plus-o", "fa-calendar-times-o", "fa-camera", "fa-camera-retro", "fa-car", "fa-caret-down", "fa-caret-left", "fa-caret-right", "fa-caret-square-o-down", "fa-caret-square-o-left", "fa-caret-square-o-right", "fa-caret-square-o-up", "fa-caret-up", "fa-cart-arrow-down", "fa-cart-plus", "fa-cc", "fa-cc-amex", "fa-cc-diners-club", "fa-cc-discover", "fa-cc-jcb", "fa-cc-mastercard", "fa-cc-paypal", "fa-cc-stripe", "fa-cc-visa", "fa-certificate", "fa-chain", "fa-chain-broken", "fa-check", "fa-check-circle", "fa-check-circle-o", "fa-check-square", "fa-check-square-o", "fa-chevron-circle-down", "fa-chevron-circle-left", "fa-chevron-circle-right", "fa-chevron-circle-up", "fa-chevron-down", "fa-chevron-left", "fa-chevron-right", "fa-chevron-up", "fa-child", "fa-chrome", "fa-circle", "fa-circle-o", "fa-circle-o-notch", "fa-circle-thin", "fa-clipboard", "fa-clock-o", "fa-clone", "fa-close", "fa-cloud", "fa-cloud-download", "fa-cloud-upload", "fa-cny", "fa-code", "fa-code-fork", "fa-codepen", "fa-codiepie", "fa-coffee", "fa-cog", "fa-cogs", "fa-columns", "fa-comment", "fa-comment-o", "fa-commenting", "fa-commenting-o", "fa-comments", "fa-comments-o", "fa-compass", "fa-compress", "fa-connectdevelop", "fa-contao", "fa-copy", "fa-copyright", "fa-creative-commons", "fa-credit-card", "fa-credit-card-alt", "fa-crop", "fa-crosshairs", "fa-css3", "fa-cube", "fa-cubes", "fa-cut", "fa-cutlery", "fa-dashboard", "fa-dashcube", "fa-database", "fa-deaf", "fa-deafness", "fa-dedent", "fa-delicious", "fa-desktop", "fa-deviantart", "fa-diamond", "fa-digg", "fa-dollar", "fa-dot-circle-o", "fa-download", "fa-dribbble", "fa-drivers-license", "fa-drivers-license-o", "fa-dropbox", "fa-drupal", "fa-edge", "fa-edit", "fa-eercast", "fa-eject", "fa-ellipsis-h", "fa-ellipsis-v", "fa-empire", "fa-envelope", "fa-envelope-o", "fa-envelope-open", "fa-envelope-open-o", "fa-envelope-square", "fa-envira", "fa-eraser", "fa-etsy", "fa-eur", "fa-euro", "fa-exchange", "fa-exclamation", "fa-exclamation-circle", "fa-exclamation-triangle", "fa-expand", "fa-expeditedssl", "fa-external-link", "fa-external-link-square", "fa-eye", "fa-eye-slash", "fa-eyedropper", "fa-fa", "fa-facebook", "fa-facebook-f", "fa-facebook-official", "fa-facebook-square", "fa-fast-backward", "fa-fast-forward", "fa-fax", "fa-feed", "fa-female", "fa-fighter-jet", "fa-file", "fa-file-archive-o", "fa-file-audio-o", "fa-file-code-o", "fa-file-excel-o", "fa-file-image-o", "fa-file-movie-o", "fa-file-o", "fa-file-pdf-o", "fa-file-photo-o", "fa-file-picture-o", "fa-file-powerpoint-o", "fa-file-sound-o", "fa-file-text", "fa-file-text-o", "fa-file-video-o", "fa-file-word-o", "fa-file-zip-o", "fa-files-o", "fa-film", "fa-filter", "fa-fire", "fa-fire-extinguisher", "fa-firefox", "fa-first-order", "fa-flag", "fa-flag-checkered", "fa-flag-o", "fa-flash", "fa-flask", "fa-flickr", "fa-floppy-o", "fa-folder", "fa-folder-o", "fa-folder-open", "fa-folder-open-o", "fa-font", "fa-font-awesome", "fa-fonticons", "fa-fort-awesome", "fa-forumbee", "fa-forward", "fa-foursquare", "fa-free-code-camp", "fa-frown-o", "fa-futbol-o", "fa-gamepad", "fa-gavel", "fa-gbp", "fa-ge", "fa-gear", "fa-gears", "fa-genderless", "fa-get-pocket", "fa-gg", "fa-gg-circle", "fa-gift", "fa-git", "fa-git-square", "fa-github", "fa-github-alt", "fa-github-square", "fa-gitlab", "fa-gittip", "fa-glass", "fa-glide", "fa-glide-g", "fa-globe", "fa-google", "fa-google-plus", "fa-google-plus-circle", "fa-google-plus-official", "fa-google-plus-square", "fa-google-wallet", "fa-graduation-cap", "fa-gratipay", "fa-grav", "fa-group", "fa-h-square", "fa-hacker-news", "fa-hand-grab-o", "fa-hand-lizard-o", "fa-hand-o-down", "fa-hand-o-left", "fa-hand-o-right", "fa-hand-o-up", "fa-hand-paper-o", "fa-hand-peace-o", "fa-hand-pointer-o", "fa-hand-rock-o", "fa-hand-scissors-o", "fa-hand-spock-o", "fa-hand-stop-o", "fa-handshake-o", "fa-hard-of-hearing", "fa-hashtag", "fa-hdd-o", "fa-header", "fa-headphones", "fa-heart", "fa-heart-o", "fa-heartbeat", "fa-history", "fa-home", "fa-hospital-o", "fa-hotel", "fa-hourglass", "fa-hourglass-1", "fa-hourglass-2", "fa-hourglass-3", "fa-hourglass-end", "fa-hourglass-half", "fa-hourglass-o", "fa-hourglass-start", "fa-houzz", "fa-html5", "fa-i-cursor", "fa-id-badge", "fa-id-card", "fa-id-card-o", "fa-ils", "fa-image", "fa-imdb", "fa-inbox", "fa-indent", "fa-industry", "fa-info", "fa-info-circle", "fa-inr", "fa-instagram", "fa-institution", "fa-internet-explorer", "fa-intersex", "fa-ioxhost", "fa-italic", "fa-joomla", "fa-jpy", "fa-jsfiddle", "fa-key", "fa-keyboard-o", "fa-krw", "fa-language", "fa-laptop", "fa-lastfm", "fa-lastfm-square", "fa-leaf", "fa-leanpub", "fa-legal", "fa-lemon-o", "fa-level-down", "fa-level-up", "fa-life-bouy", "fa-life-buoy", "fa-life-ring", "fa-life-saver", "fa-lightbulb-o", "fa-line-chart", "fa-link", "fa-linkedin", "fa-linkedin-square", "fa-linode", "fa-linux", "fa-list", "fa-list-alt", "fa-list-ol", "fa-list-ul", "fa-location-arrow", "fa-lock", "fa-long-arrow-down", "fa-long-arrow-left", "fa-long-arrow-right", "fa-long-arrow-up", "fa-low-vision", "fa-magic", "fa-magnet", "fa-mail-forward", "fa-mail-reply", "fa-mail-reply-all", "fa-male", "fa-map", "fa-map-marker", "fa-map-o", "fa-map-pin", "fa-map-signs", "fa-mars", "fa-mars-double", "fa-mars-stroke", "fa-mars-stroke-h", "fa-mars-stroke-v", "fa-maxcdn", "fa-meanpath", "fa-medium", "fa-medkit", "fa-meetup", "fa-meh-o", "fa-mercury", "fa-microchip", "fa-microphone", "fa-microphone-slash", "fa-minus", "fa-minus-circle", "fa-minus-square", "fa-minus-square-o", "fa-mixcloud", "fa-mobile", "fa-mobile-phone", "fa-modx", "fa-money", "fa-moon-o", "fa-mortar-board", "fa-motorcycle", "fa-mouse-pointer", "fa-music", "fa-navicon", "fa-neuter", "fa-newspaper-o", "fa-object-group", "fa-object-ungroup", "fa-odnoklassniki", "fa-odnoklassniki-square", "fa-opencart", "fa-openid", "fa-opera", "fa-optin-monster", "fa-outdent", "fa-pagelines", "fa-paint-brush", "fa-paper-plane", "fa-paper-plane-o", "fa-paperclip", "fa-paragraph", "fa-paste", "fa-pause", "fa-pause-circle", "fa-pause-circle-o", "fa-paw", "fa-paypal", "fa-pencil", "fa-pencil-square", "fa-pencil-square-o", "fa-percent", "fa-phone", "fa-phone-square", "fa-photo", "fa-picture-o", "fa-pie-chart", "fa-pied-piper", "fa-pied-piper-alt", "fa-pied-piper-pp", "fa-pinterest", "fa-pinterest-p", "fa-pinterest-square", "fa-plane", "fa-play", "fa-play-circle", "fa-play-circle-o", "fa-plug", "fa-plus", "fa-plus-circle", "fa-plus-square", "fa-plus-square-o", "fa-podcast", "fa-power-off", "fa-print", "fa-product-hunt", "fa-puzzle-piece", "fa-qq", "fa-qrcode", "fa-question", "fa-question-circle", "fa-question-circle-o", "fa-quora", "fa-quote-left", "fa-quote-right", "fa-ra", "fa-random", "fa-ravelry", "fa-rebel", "fa-recycle", "fa-reddit", "fa-reddit-alien", "fa-reddit-square", "fa-refresh", "fa-registered", "fa-remove", "fa-renren", "fa-reorder", "fa-repeat", "fa-reply", "fa-reply-all", "fa-resistance", "fa-retweet", "fa-rmb", "fa-road", "fa-rocket", "fa-rotate-left", "fa-rotate-right", "fa-rouble", "fa-rss", "fa-rss-square", "fa-rub", "fa-ruble", "fa-rupee", "fa-s15", "fa-safari", "fa-save", "fa-scissors", "fa-scribd", "fa-search", "fa-search-minus", "fa-search-plus", "fa-sellsy", "fa-send", "fa-send-o", "fa-server", "fa-share", "fa-share-alt", "fa-share-alt-square", "fa-share-square", "fa-share-square-o", "fa-shekel", "fa-sheqel", "fa-shield", "fa-ship", "fa-shirtsinbulk", "fa-shopping-bag", "fa-shopping-basket", "fa-shopping-cart", "fa-shower", "fa-sign-in", "fa-sign-language", "fa-sign-out", "fa-signal", "fa-signing", "fa-simplybuilt", "fa-sitemap", "fa-skyatlas", "fa-skype", "fa-slack", "fa-sliders", "fa-slideshare", "fa-smile-o", "fa-snapchat", "fa-snapchat-ghost", "fa-snapchat-square", "fa-snowflake-o", "fa-soccer-ball-o", "fa-sort", "fa-sort-alpha-asc", "fa-sort-alpha-desc", "fa-sort-amount-asc", "fa-sort-amount-desc", "fa-sort-asc", "fa-sort-desc", "fa-sort-down", "fa-sort-numeric-asc", "fa-sort-numeric-desc", "fa-sort-up", "fa-soundcloud", "fa-space-shuttle", "fa-spinner", "fa-spoon", "fa-spotify", "fa-square", "fa-square-o", "fa-stack-exchange", "fa-stack-overflow", "fa-star", "fa-star-half", "fa-star-half-empty", "fa-star-half-full", "fa-star-half-o", "fa-star-o", "fa-steam", "fa-steam-square", "fa-step-backward", "fa-step-forward", "fa-stethoscope", "fa-sticky-note", "fa-sticky-note-o", "fa-stop", "fa-stop-circle", "fa-stop-circle-o", "fa-street-view", "fa-strikethrough", "fa-stumbleupon", "fa-stumbleupon-circle", "fa-subscript", "fa-subway", "fa-suitcase", "fa-sun-o", "fa-superpowers", "fa-superscript", "fa-support", "fa-table", "fa-tablet", "fa-tachometer", "fa-tag", "fa-tags", "fa-tasks", "fa-taxi", "fa-telegram", "fa-television", "fa-tencent-weibo", "fa-terminal", "fa-text-height", "fa-text-width", "fa-th", "fa-th-large", "fa-th-list", "fa-themeisle", "fa-thermometer", "fa-thermometer-0", "fa-thermometer-1", "fa-thermometer-2", "fa-thermometer-3", "fa-thermometer-4", "fa-thermometer-empty", "fa-thermometer-full", "fa-thermometer-half", "fa-thermometer-quarter", "fa-thermometer-three-quarters", "fa-thumb-tack", "fa-thumbs-down", "fa-thumbs-o-down", "fa-thumbs-o-up", "fa-thumbs-up", "fa-ticket", "fa-times", "fa-times-circle", "fa-times-circle-o", "fa-times-rectangle", "fa-times-rectangle-o", "fa-tint", "fa-toggle-down", "fa-toggle-left", "fa-toggle-off", "fa-toggle-on", "fa-toggle-right", "fa-toggle-up", "fa-trademark", "fa-train", "fa-transgender", "fa-transgender-alt", "fa-trash", "fa-trash-o", "fa-tree", "fa-trello", "fa-tripadvisor", "fa-trophy", "fa-truck", "fa-try", "fa-tty", "fa-tumblr", "fa-tumblr-square", "fa-turkish-lira", "fa-tv", "fa-twitch", "fa-twitter", "fa-twitter-square", "fa-umbrella", "fa-underline", "fa-undo", "fa-universal-access", "fa-university", "fa-unlink", "fa-unlock", "fa-unlock-alt", "fa-unsorted", "fa-upload", "fa-usb", "fa-usd", "fa-user", "fa-user-circle", "fa-user-circle-o", "fa-user-md", "fa-user-o", "fa-user-plus", "fa-user-secret", "fa-user-times", "fa-users", "fa-vcard", "fa-vcard-o", "fa-venus", "fa-venus-double", "fa-venus-mars", "fa-viacoin", "fa-viadeo", "fa-viadeo-square", "fa-video-camera", "fa-vimeo", "fa-vimeo-square", "fa-vine", "fa-vk", "fa-volume-control-phone", "fa-volume-down", "fa-volume-off", "fa-volume-up", "fa-warning", "fa-wechat", "fa-weibo", "fa-weixin", "fa-whatsapp", "fa-wheelchair", "fa-wheelchair-alt", "fa-wifi", "fa-wikipedia-w", "fa-window-close", "fa-window-close-o", "fa-window-maximize", "fa-window-minimize", "fa-window-restore", "fa-windows", "fa-won", "fa-wordpress", "fa-wpbeginner", "fa-wpexplorer", "fa-wpforms", "fa-wrench", "fa-xing", "fa-xing-square", "fa-y-combinator", "fa-y-combinator-square", "fa-yahoo", "fa-yc", "fa-yc-square", "fa-yelp", "fa-yen", "fa-yoast", "fa-youtube", "fa-youtube-play", "fa-youtube-square"];


        $scope.imageSrc = [];
        $scope.typeSelected = [];
        $scope.counterAdded = 0;


        $scope.getWorks = function () {


            workServices.getWorks().then(function (myReponseData) {

                console.log("GETWORKS");
                $scope.resultWorks = myReponseData.data;

                for (var i = 0; i < $scope.resultWorks.length; i++) {
                    $scope.imageSrc[i] = $scope.resultWorks[i].image;

                    $scope.typeSelected[i] = $scope.resultWorks[i].id_type;

                }
            });

        }

       $scope.getWorksType = function() {
            workServices.getAllWorksType().then(function (myReponseData) {
                $scope.resultWorksType = myReponseData.data;
                $scope.getWorks();

            });


        }
        $scope.getWorksType();

        $scope.updateDescription = function () {

            console.log("----WORKS UPDATE----");

            var payload = {
                description: $scope.description
            };

            workServices.updateDescription(payload).then(function (myReponseData) {
                getDescription();
            });


        }

        function getDescription() {

            workServices.getDescription().then(function (myReponseData) {
                $scope.description = myReponseData.data[0].description;
            });

        }

        function updateWorkType(newArrayWorkType) {

            console.log("UPDATE-->", newArrayWorkType);

            workServices.updateWorksType(newArrayWorkType).then(function (myReponseData) {
                $timeout( $scope.getWorksType(), 500);
            });

        }

        $scope.showIcons = function (ev, type) {
            $mdDialog.show({
                controller: DialogController,
                locals: {dataToPass: $scope.allIcons, type: type},
                templateUrl: 'pagesServer/dialog-choose-icon.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                .then(function (answer) {
                    // console.log("CLOSEEEE");
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function (type) {
                    if (type) {
                        angular.element(document.querySelector("#id_icon_" + type.id)).removeClass().addClass("fa " + type.icon);
                    }
                });
        };

        $scope.test=function () {
            console.log("TEST!!!");
        }

        function DialogController($scope, $mdDialog, dataToPass, type) {

            $scope.listIcons = dataToPass;

            $scope.type = type;
            $scope.tableData = chunk($scope.listIcons, 10);
            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function (icon) {
                if (icon) {
                    $scope.type.icon = icon;
                    $mdDialog.cancel(type);
                } else {
                    $mdDialog.cancel();

                }

            };

            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };

            function chunk(arr, len) {
                var chunks = [],
                    i = 0,
                    n = arr.length;
                while (i < n) {
                    chunks.push(arr.slice(i, i += len));
                }
                return chunks;
            }

            $scope.clickIcon = function (icon) {

                console.log("ICON: " + icon);
                $scope.myIcon = icon;
                $scope.myStyle = {'color': 'red'};
                $scope.cancel($scope.myIcon);

            }
        }

        $scope.addNewType = function () {

            $scope.resultWorksType.push({id: new Date().getTime(), type: "", icon: "fa-cubes"});
            console.log(new Date().getTime());

        }

        $scope.updateTypes = function () {

            var newArrayWorkType = [];

            for (var i = 0; i < $scope.resultWorksType.length; i++) {
                var id = $scope.resultWorksType[i].id;

                var classNameIcon = angular.element(document.querySelector("#id_icon_" + id)).attr('class');

                var splitted = classNameIcon.split(" ");
                var sicon = splitted[1];

                var type = angular.element(document.querySelector("#id_type_" + id)).val();


                newArrayWorkType.push({id: id, type: type, icon: sicon});

            }
            var control = false;
            for (var i = 0; i < newArrayWorkType.length; i++) {
                var type = newArrayWorkType[i].type;
                console.log("TYPE DA INSERIRE-->" + type);
                if (type == "")
                    control = true;
            }

            if (control) {
                showAlert("Attenzione", "Devi inserire il valore per il tipo!");
            }
            else {
                updateWorkType(newArrayWorkType);

            }


        }

        $scope.removeType = function (type) {


            //se l'id è un timestamp vuol dire che lo devo cancellare dalla grafica e non dal db
            if (type.id > 10000000) {
                var index = $scope.resultWorksType.indexOf(type);
                $scope.resultWorksType.splice(index, 1);
            }
            else {
                showConfirmDialogWorkType(type);
            }

        }



        function removeWorkType(id_type) {

            workServices.deleteWorkType(id_type).then(function (myReponseData) {
                $timeout($scope.getWorksType, 500);
            });


        }

        $scope.updateWork = function (id, image, type, title, index_list) {



            var newImage = "";
            if (image == "")
                newImage = $scope.resultWorks[index_list].image;
            else
                newImage = image;

            var newType = "";

            if (type == undefined)
                newType = $scope.resultWorks[index_list].id_type;
            else
                newType = type;

            var newTitle = "";
            if (title == undefined)
                newTitle = $scope.resultWorks[index_list].title;
            else
                newTitle = title;



            console.log("UPADate: "+id+"--"+newType+"--"+newTitle+"--"+index_list);

            // // console.log("--->" + id + "----->" + newImage);
            // // console.log("INSERT PROFILE--->"+$scope.title+"--"+$scope.subtitle);
            //
            var payload = {
                id: id,
                image: newImage,
                title: newTitle,
                id_type: newType
            };

            workServices.updateWork(payload).then(function (myReponseData) {
                $scope.getWorks();
            });


        }

        function deleteWork(id)  {

            var payload = {
                id: id
            };

            workServices.deleteWork(payload).then(function (myReponseData) {
                $scope.getWorksType();
            });

        }
        $scope.removeWork = function(work){
            showConfirmDialogWork(work);
        }

        $scope.addDiv = function () {
            $scope.counterAdded = $scope.counterAdded + 1;
            console.log("COUNTER: "+$scope.counterAdded);
            var divElement = angular.element(document.querySelector('#space-for-newDiv'));
            var appendHtml = $compile('<div counter="counterAdded"  workdiv  >work</div>')($scope);
            divElement.append(appendHtml);
        }


        function showAlert(title_, content) {
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application
            // to prevent interaction outside of dialog
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .clickOutsideToClose(true)
                    .title(title_)
                    .textContent(content)
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                //.targetEvent(ev)
            );
        };

        function showConfirmDialogWorkType(type) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Eliminazione Tipo: "' + type.type + '"')
                .textContent('Vuoi davvero eliminarlo? Cancellerai anche tutti i lavori associato ad esso!')
                .ariaLabel(type.id)
                .ok('OK')
                .cancel('ANNULLA');

            $mdDialog.show(confirm)
                .then(function () {
                    var id_type = confirm._options.ariaLabel;
                    console.log("CANCELLA TYPE-->", id_type);
                    removeWorkType(id_type);
                }, function () {
                    $scope.status = 'You decided to keep your debt.';
                });
        };

        function showConfirmDialogWork(work) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Eliminazione Work: "' + work.title + '"')
                .textContent('Vuoi davvero eliminarlo?')
                .ariaLabel(work.id)
                .ok('OK')
                .cancel('ANNULLA');

            $mdDialog.show(confirm)
                .then(function () {
                    var id_work = confirm._options.ariaLabel;
                    console.log("CANCELLA work-->", id_work);
                    deleteWork(id_work);
                }, function () {
                    $scope.status = 'You decided to keep your debt.';
                });
        };

        function DialogConfirmController(type) {

            // console.log("TYPE DA CANCELLARE-->"+type.type);
            $scope.ok = function () {

                $mdDialog.cancel(type)

            };

        }

        $scope.filterWorks= function(filterSelected){
            console.log(filterSelected);
            var payload = {
                id_type: filterSelected
            };

            workServices.getWorksFromType(payload).then(function (myReponseData) {
                $scope.resultWorks = myReponseData.data;
                console.log(myReponseData.data)

                for (var i = 0; i < $scope.resultWorks.length; i++) {
                    $scope.imageSrc[i] = $scope.resultWorks[i].image;

                    $scope.typeSelected[i] = $scope.resultWorks[i].id_type;

                }
            });
        }

    }
])

    .directive('workdiv', function ($location, $anchorScroll, workServices,$mdDialog,$window,$timeout) {
        return {


            scope: {
                counter: '='

            },
            templateUrl: 'pagesServer/single_work.html',
            controller: function ($rootScope, $scope, $element) {

                $location.hash('bottomDiv');
                // // call $anchorScroll()
                $anchorScroll();


                $scope.localCounter = $scope.counter;
                workServices.getAllWorksType().then(function (myReponseData) {
                    $scope.resultWorksType = myReponseData.data;

                });


                $scope.removeDiv = function (counterToRemove) {
                     console.log("REM");
                     console.log("counter centrale--->: "+$scope.counter+"----cremove--"+counterToRemove);
                    var myEl = angular.element(document.querySelector('#div_work_' + counterToRemove));
                    myEl.remove();   //removes element
                };
                function isBlank(s){
                    return isEmpty(s.trim());
                }
                function isEmpty(s){
                    return !s.length;
                }

                $scope.addWork = function (image, type, title) {


                    if(image==undefined || type==undefined ||  title==undefined || (title!=undefined && isBlank(title)))
                    {
                        showAlert("Errore", "Inserisci tutti i campi!");

                    }else{
                        var payload = {
                            image: image,
                            id_type:type,
                            title: title,
                        };


                        workServices.insertWork(payload).then(function (myReponseData) {

                            showAlert("Inserimento", "Hai inserito un nuovo work con successo!");
                            $window.location.reload();

                        });
                    }

                }

                function showAlert(title_, content) {
                    // Appending dialog to document.body to cover sidenav in docs app
                    // Modal dialogs should fully cover application
                    // to prevent interaction outside of dialog
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.body))
                            .clickOutsideToClose(true)
                            .title(title_)
                            .textContent(content)
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                        //.targetEvent(ev)
                    );
                };

            }
        }
    });
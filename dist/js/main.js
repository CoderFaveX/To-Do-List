$(() => {
    let inpField = $(".input-item input").val();
    let toggleComplete = $(".todo-item");
    let elem;
    let itemNo = 5;
    let counter = 0;
    let retrieveCount;
    let lightMode = true;
    counter = Number(localStorage.getItem("count"));
    console.clear();
    console.log("Clearing your local-storage for this site will affect your UI/UX !!!");
    if (localStorage.getItem("mode") == "dark") {
        $(".flex-head").addClass("flex-head-dark");
        $(".input-item").addClass("input-item-dark");
        $(".todo-list").addClass("todo-list-dark");
        $(".links").addClass("links-dark");
        $("body").addClass("body-dark");
        $(".imgTrap img").get(0).src = '../images/icon-sun.svg';
    }
    else {
        $(".flex-head").removeClass("flex-head-dark");
        $(".input-item").removeClass("input-item-dark");
        $(".todo-list").removeClass("todo-list-dark");
        $(".links").removeClass("links-dark");
        $("body").removeClass("body-dark");
        $(".imgTrap img").get(0).src = '../images/icon-moon.svg';
    }
    function listFunc(elem) {
        $(elem).each(function () {
            $(".all").click(() => { sortAll(elem); });
            $(".notComp").click(() => { sortSemi(elem); });
            $(".comp").click(() => { sortComp(elem); });
            $(".clear").click(() => { clearComp(elem); });;
            $(this).children(".maintain").click(() => {
                $(this).children(".todo-txt").toggleClass("strike");
                if ($(this).children(".maintain").hasClass("todo-check")) {
                    $(this).children(".maintain").children("img").get(0).style.display = "none";
                    $(this).children(".maintain").removeClass("todo-check");
                    $(this).children(".maintain").addClass("imgRem");
                    itemNo++;
                    $("#left").text(itemNo);
                }
                else {
                    $(this).children(".maintain").children("img").get(0).style.display = "initial";
                    $(this).children(".maintain").addClass("todo-check");
                    $(this).children(".maintain").removeClass("imgRem");
                    itemNo--;
                    $("#left").text(itemNo);
                }
            });
            $(this).children(".todo-del").click(() => {
                $(this).children(".todo-del").parent().remove();
                itemNo--;
                $("#left").text(itemNo);
                if ($(this).children(".maintain").hasClass("todo-check")) {
                    itemNo++;
                    $("#left").text(itemNo);
                    if (itemNo == 1) {
                        $("#sing-plu").text("item");
                    }
                    else {
                        $("#sing-plu").text("items");
                    }
                }
                if (itemNo == 1) {
                    $("#sing-plu").text("item");
                }
                else {
                    $("#sing-plu").text("items");
                }
            });
        });
    }
    listFunc(toggleComplete);
    $(".to-top").click(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
    $(".circle-func").click(() => { validateList(); })
    $(".input-item input").keypress((e) => {
        if (e.keyCode == 13) {
            validateList();
        }
    });
    function validateList() {
        inpField = $(".input-item input").val();
        if (inpField != "") {
            elem = document.createElement("div");
            elem.classList.add("todo-item");
            $(".appendDiv").append(elem);
            $(elem).append("<div class='imgRem maintain'><img src='../images/icon-check.svg' alt=''></div>");
            $(elem).append("<div class='todo-txt'></div>");
            $(elem).append("<div class='todo-del'><img src='../images/icon-cross.svg' alt=''></div>");
            $(elem).children(".todo-txt").text(inpField);
            $(".input-item input").val("");
            $(".all").click(() => { sortAll(toggleComplete); });
            $(".notComp").click(() => { sortSemi(toggleComplete); });
            $(".comp").click(() => { sortComp(toggleComplete); });
            itemNo++;
            $("#left").text(itemNo);
            listFunc(elem);
            return true;
        }
        else {
            alert("Type In Something");
            return false;
        }
    }
    function sortAll(elem) {
        $(elem).each(function () {
            $(this).get(0).style.display = "flex";
            $(".notComp, .comp").removeClass("active");
            $(".all").addClass("active");
        });
    }
    function sortSemi(elem) {
        $(elem).each(function () {
            if ($(this).children(".maintain").hasClass("imgRem")) {
                $(this).get(0).style.display = "flex";
                $(".all, .comp").removeClass("active");
                $(".notComp").addClass("active");
            } else { $(this).get(0).style.display = "none"; }
        });
    }
    function sortComp(elem) {
        $(elem).each(function () {
            if ($(this).children(".maintain").hasClass("todo-check")) {
                $(this).get(0).style.display = "flex";
                $(".all, .notComp").removeClass("active");
                $(".comp").addClass("active");
            } else { $(this).get(0).style.display = "none"; }
        });
    }
    function clearComp(elem) {
        $(elem).each(function () {
            if ($(this).children(".maintain").hasClass("todo-check")) {
                $(this).remove();
            }
        });
    }
    $(".all").click(() => { sortAll(toggleComplete); });
    $(".notComp").click(() => { sortSemi(toggleComplete); });
    $(".comp").click(() => { sortComp(toggleComplete); });
    $(".clear").click(() => { clearComp(toggleComplete); });
    $(".imgTrap").click(() => {
        counter++;
        retrieveCount = localStorage.setItem("count", `${counter}`);
        $(".flex-head").toggleClass("flex-head-dark");
        $(".input-item").toggleClass("input-item-dark");
        $(".todo-list").toggleClass("todo-list-dark");
        $(".links").toggleClass("links-dark");
        $("body").toggleClass("body-dark");
        if (counter % 2 != 0) {
            $(".imgTrap img").get(0).src = '../images/icon-sun.svg';
            lightMode = false;
        } else {
            $(".imgTrap img").get(0).src = '../images/icon-moon.svg';
            lightMode = true;
        }
        if (lightMode == true) {
            localStorage.setItem("mode", "light");
        }
        else {
            localStorage.setItem("mode", "dark");
        }
    });
});
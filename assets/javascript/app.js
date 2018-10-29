$(document).ready(function(){
    $("#restart").hide();
    $("#game-area").hide();
    $("#start").on("click", game.start);
    $("#restart").on("click", game.start);
})

    var game = {
        //// Parameters
        correctAnswers: 0,
        wrongAnswers: 0,
        timeOuts: 0,
        counter: 15,
        counterIntervalId: "",
        questionIndex: 0,
        button: $("<button>"),
        userSelect: "",
        questionList: "",

        questions: [
            { 
                q: "Which NBA team drafted Shaquille O’Neal and was the first of several teams for which he played?",
                o: ["L.A. Lakers", "Miami Heat", "Phoenix Suns", "Orlando Magic"], 
                a: "Orlando Magic",
                g: "https://media.giphy.com/media/xUA7aUOybCDbpN5s6k/giphy.gif"
            },
            { 
                q: "Which NBA coach led the Jordan-era Bulls to 3 consecutive championships, and then coached a Kobe-led Lakers to another 3 consecutive championships?",
                o: ["Pat Riley", "Larry Brown", "Gregg Popovich", "Phil Jackson"],
                a: "Phil Jackson",
                g: "https://media.giphy.com/media/o9yEYXabWbsM8/giphy.gif"
            },
            { 
                q: "For which university did Michael Jordan play basketball?",
                o: ["University of Chicago", "Duke University", "University of North Carolina", "University of Kansas"],
                a: "University of North Carolina",
                g: "https://media.giphy.com/media/KfMI3lYfaB3IQ/giphy.gif"
            },
            { 
                q: "What franchise has played in the most NBA finals since 1947?", 
                o: ["The Celtics", "The Lakers", "The Spurs", "The Bulls"], 
                a: "The Lakers",
                g: "https://media.giphy.com/media/l46Craj343bB2TMSA/giphy.gif"
            },
            { 
                q: "What two NBA players won the MVP trophy three times each from 1986 through 1992?",
                o: ["Larry Bird & Michael Jordan", "Larry Bird & Magic Johnson", "Magic Johnson & Michael Jordan", "Larry Bird & Charles Barkley"],
                a: "Magic Johnson & Michael Jordan",
                g: "https://media.giphy.com/media/4J8kKHDwTZlVm/giphy.gif"
                
            },
            { 
                q: "What NBA team failed to make the playoffs in 1994 for the first time since 1976?", 
                o: ["The New York Knicks", "The Boston Celtics" , "The Los Angeles Lakers", "The Detroit Pistons"], 
                a: "The Los Angeles Lakers",
                g: "https://media.giphy.com/media/26vIfKDKOw34lHRks/giphy.gif"
            },
            { 
                q: "Which one of these is not a 1st overall draft pick?",
                o: ["Chris Webber", "Allen Iverson", "Kenyon Martin", "Dikembe Mutombo"], 
                a: "Dikembe Mutombo",
                g: "https://media.giphy.com/media/WO5GDSsx76rTy/giphy.gif"
            }
        ],

        //// Game Start
        start: function() {
            $("#game-area").show();
            $("#timer-section").show();
            $("#restart").hide();
            $("#result-area").empty();
            $("#correct-answers").empty();
            $("#wrong-answers").empty();
            $("#time-outs").empty();
            game.questions;
            game.correctAnswers = 0;
            game.wrongAnswers = 0;
            game.timeOuts = 0;
            game.questionIndex = 0;
            game.nextQuestions();
        },
        //// Launch initial questions or next questions
        nextQuestions: function() {
            $("#start").hide();
            $("#timer-area").show();
            $("#questions-area").html("<p>" + game.questions[game.questionIndex].q + "</p>");

            game.timerRun();
            game.counter = 15;
        
            for (var i = 0; i < 4; i++) {
                game.questionList = game.questions[game.questionIndex].o[i];
                game.buttons = $("<button>");
                game.buttons.text(game.questionList);
                game.buttons.attr({"data-index": i });
                game.buttons.addClass("selected option btn btn-secondary btn-md mx-1");
                $("#answers-area").append(game.buttons);
                game.selectAnswer();
                };
            },

        //// Timer
        timerRun: function() {
            clearInterval(game.counterIntervalId);
            game.counterIntervalId = "";
            game.counterIntervalId = setInterval(game.decrement, 1000);
        },

        decrement: function() {
            //  Decrease number by one.
            game.counter--;
            //  Show the number
            $("#timer-area").text("You have " + game.counter + " seconds left to answer your question!");
            //  Once number hits zero
            if (game.counter === -1) {
                $("#result-area").html("<h3>" + "Time Out!" + "</h3>");
                game.timeOuts++;
                game.wait = setTimeout(game.quickReset, 1000);
            }
        },

        selectAnswer: function() {

            game.userSelect = "";

            $("button.selected").on("click", function() {
                game.userSelect = $(this).text();
                clearInterval(game.counterIntervalId);
                                        console.log(game.questions[game.questionIndex].a)
                                        console.log(game.userSelect);
                if (game.userSelect === game.questions[game.questionIndex].a) {
                    console.log(true);
                    // game.button.removeClass("btn-secondary").addClass("btn-success");
                    game.correctAnswers++;
                    $("#result-area").html("<h3>" + "Correct Answer!" + "</h3>").css("color", "green");

                    var giphyImage = $("<img>");
                    giphyImage.attr("src", game.questions[game.questionIndex].g);
                    $("#images").prepend(giphyImage);

                    game.wait = setTimeout(game.quickReset, 4000);
                                            console.log(game.correctAnswers);
                                            console.log(game.questionIndex);
                    } else { 
                        // game.button.removeClass("btn-secondary").addClass("btn-danger");
                        game.wrongAnswers++;
                        $("#result-area").html("<h3>" + "Wrong Answer!" + "</h3>").css("color", "red");
                        game.wait = setTimeout(game.quickReset, 1000);
                                                console.log(game.wrongAnswers);
                                                console.log(game.questionIndex);
                        }
            });
        },
        //// Quick Reset between questions
        quickReset: function() {
            game.questionIndex++;
            if (game.questionIndex < 7) {
                $("#questions-area").empty();
                $("#answers-area").empty();
                $("#result-area").empty();
                $("#images").empty();
                $("#timer-area").text("Count Down!");
                game.questionList = "";
                game.nextQuestions();
            } else {
                game.over();
                }
        },
        //// Game Over
        over: function() {
            clearInterval(game.counterIntervalId);
            clearTimeout(game.wait);
            game.counter = "";

            $("#restart").show();
            $("#questions-area").empty();
            $("#answers-area").empty();
            $("#timer-area").empty();
            $("#images").empty();
            $("#result-area").html("<h3>" + "GAME OVER!" + "</h3>").css("color", "red");
            $("#correct-answers").text("Correct Answer: " + game.correctAnswers);
            $("#wrong-answers").text("Wrong Answer: " + game.wrongAnswers);
            $("#time-outs").text("Time Outs: " + game.timeOuts);
            
            $(document).ready();

            return game.nextQuestions();

        }

    }


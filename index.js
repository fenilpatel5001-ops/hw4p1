/* 
File: index.js
Fenil Patel
*/

$(document).ready(function () {
    $.validator.addMethod("minLessEqualMaxCol", function (value, element) {
        const minCol = parseInt($("#minCol").val(), 10);
        const maxCol = parseInt($("#maxCol").val(), 10);

        if (isNaN(minCol) || isNaN(maxCol)) {
            return true; 
        }
        return minCol <= maxCol;
    }, "Minimum column must be less than or equal to maximum column.");

    $.validator.addMethod("minLessEqualMaxRow", function (value, element) {
        const minRow = parseInt($("#minRow").val(), 10);
        const maxRow = parseInt($("#maxRow").val(), 10);

        if (isNaN(minRow) || isNaN(maxRow)) {
            return true;
        }
        return minRow <= maxRow;
    }, "Minimum row must be less than or equal to maximum row.");

    $("#multForm").validate({
        rules: {
            minCol: {
                required: true,
                number: true,
                min: -50,
                max: 50
            },
            maxCol: {
                required: true,
                number: true,
                min: -50,
                max: 50,
                minLessEqualMaxCol: true
            },
            minRow: {
                required: true,
                number: true,
                min: -50,
                max: 50
            },
            maxRow: {
                required: true,
                number: true,
                min: -50,
                max: 50,
                minLessEqualMaxRow: true
            }
        },
        messages: {
            minCol: {
                required: "Please enter a minimum column value.",
                number: "Minimum column must be a number.",
                min: "Minimum column cannot be less than -50.",
                max: "Minimum column cannot be greater than 50."
            },
            maxCol: {
                required: "Please enter a maximum column value.",
                number: "Maximum column must be a number.",
                min: "Maximum column cannot be less than -50.",
                max: "Maximum column cannot be greater than 50.",
                minLessEqualMaxCol: "Minimum column must be less than or equal to maximum column."
            },
            minRow: {
                required: "Please enter a minimum row value.",
                number: "Minimum row must be a number.",
                min: "Minimum row cannot be less than -50.",
                max: "Minimum row cannot be greater than 50."
            },
            maxRow: {
                required: "Please enter a maximum row value.",
                number: "Maximum row must be a number.",
                min: "Maximum row cannot be less than -50.",
                max: "Maximum row cannot be greater than 50.",
                minLessEqualMaxRow: "Minimum row must be less than or equal to maximum row."
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element); 
        },
        highlight: function (element) {
            $(element).addClass("error");
        },
        unhighlight: function (element) {
            $(element).removeClass("error");
        },
        submitHandler: function (form, event) {
            event.preventDefault();
            generateTable();
        }
    });
});


function generateTable() {

    let minCol = parseInt(document.getElementById("minCol").value);
    let maxCol = parseInt(document.getElementById("maxCol").value);
    let minRow = parseInt(document.getElementById("minRow").value);
    let maxRow = parseInt(document.getElementById("maxRow").value);

    let rowSize = maxRow - minRow + 1;
    let colSize = maxCol - minCol + 1;

    let table = "<table>";
    table += "<tr><th></th>";

    for (let i = 0; i < colSize; i++) {
        table += "<th>" + (minCol + i) + "</th>";
    }
    table += "</tr>";

    for (let i = 0; i < rowSize; i++) {
        let rowNum = minRow + i;
        table += "<tr><td>" + rowNum + "</td>";
        for (let j = 0; j < colSize; j++) {
            let colNum = minCol + j;
            table += "<td>" + (rowNum * colNum)  + "</td>";
        }
        table += "</tr>";
    }
    table += "</table>";
    document.getElementById("table").innerHTML = table;
}

//Initialize variables
var userName = document.getElementById('userName');
var description = document.getElementById('description');
var webReference = document.getElementById('webReference');


//Read data from JSON file
$(document).ready(function () {
    $.getJSON("data.json",
        function (data) {
            var userForm = '';
            var jsonList = userForm.data;

            //Iterating through object
            $.each(data, function (key, value) {

                //Data from Json object
                userForm += '<tr>';
                userForm += '<td>' +
                    "<input type='checkbox' name='tdCheckbox' class='rowCheckbox'>" +
                    '</td>';
                userForm += '<td>' +
                    value.name + '</td>';
                userForm += '<td>' +
                    value.description + '</td>';
                userForm += '<td>' +
                    value.webReference + '</td>';
                userForm += '</tr>';
            });

            //Inseting row into table
            $('#tableAlerts').append(userForm);
            tablePagination("tableAlerts");
        });
});


//Insert data into table
function onFormSubmit() {
    validateInputs();
}

function validateInputs() {
    if (userName.value == "" || description.value == "" || webReference.value == "") {
        return false;
    } else {
        var fromData = readFromData();
        insertNewRecord(fromData);
        clearData();
    }
}

function readFromData() {
    var fromData = {};
    fromData["userName"] = userName.value;
    fromData["description"] = description.value;
    fromData["webReference"] = webReference.value;
    return fromData;
}

function insertNewRecord(data) {
    var table = document.getElementById("tableAlerts").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell0 = newRow.insertCell(0);
    cell0.innerHTML = "<input type='checkbox' name='tdCheckbox' class='checkbox'>";
    cell1 = newRow.insertCell(1);
    cell1.innerHTML = data.userName;
    cell2 = newRow.insertCell(2);
    cell2.innerHTML = data.description;
    cell3 = newRow.insertCell(3);
    cell3.innerHTML = data.webReference;
}

//Delete record
function deleteRows() {
    if (document.querySelectorAll("input[type='checkbox']:checked").length <= 0) {
        alert("Please select atleast 1 record");
    } else {
        var enableCheckBox = tBody.querySelectorAll("input[type='checkbox']:checked")
        Array.prototype.slice.call(enableCheckBox)
            .forEach(input => tBody.removeChild(input.parentNode.parentNode));
        document.getElementById('thCheckbox').checked = false;
    }
}


//Select all checkbox
document.getElementById('thCheckbox').onclick = function () {
    var checkboxes = document.getElementsByName('tdCheckbox');
    for (var checkbox of checkboxes) {
        checkbox.checked = this.checked;
    }
}


var tableElement = $('table');
tableElement.on('change', 'input[type=checkbox]', function (event) {
    var changed = event.target,
        checkboxes = tableElement
        .find('input[type=checkbox]')
        .not('#thCheckbox');

    if (changed.id === 'select-all') {
        checkboxes.prop('checked', changed.checked)
    } else {
        var allChecked = checkboxes.length === checkboxes.filter(':checked').length
        $('#thCheckbox').prop(
            'checked', allChecked
        );

    }
});



//Clear input fields once user save response
function clearData() {
    userName.value = "";
    description.value = "";
    webReference.value = "";
}

// For onlyalphabets validation
function onlyAlphabets(e, t) {
    try {
        if (window.event) {
            var charCode = window.event.keyCode;
        } else if (e) {
            var charCode = e.which;
        } else {
            return true;
        }
        if ((charCode == 32) || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123))
            return true;
        else
            return false;
    } catch (err) {
        alert(err.Description);
    }
}

function btnOkClose() {
    $('#modalViewAlerts').modal('hide');
}

function tablePagination(tableId) {
    var domSetup = "<'row'<'col-sm-4'f><'col-sm-5'B><'col-sm-3'l>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-5'i><'col-sm-7'p>>";
    var table = $('#' + tableId).DataTable({
        "dom": domSetup,
        paging: true,
        lengthChange: false,
        searching: false,
        bInfo: false,
        pageLength: 20,
        columnDefs: [{
            targets: 0,
            orderable: false
            }]

    });
}
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
/*
document.getElementById("setLocalStorage").addEventListener("click", setLocalStorage); 
document.getElementById("showLocalStorage").addEventListener("click", showLocalStorage); 
document.getElementById("removeProjectFromLocalStorage").addEventListener("click", removeProjectFromLocalStorage); 
document.getElementById("getLocalStorageByKey").addEventListener("click", getLocalStorageByKey);  
var localStorage = window.localStorage; 

 function setLocalStorage() { 
    localStorage.setItem("Name", "John"); 
    localStorage.setItem("Job", "Developer"); 
    localStorage.setItem("Project", "Cordova Project"); 
 }

  function showLocalStorage() { 
    console.log(localStorage.getItem("Name")); 
    console.log(localStorage.getItem("Job")); 
    console.log(localStorage.getItem("Project")); 
 }

   function removeProjectFromLocalStorage() {
    localStorage.removeItem("Project");
 }

  function getLocalStorageByKey() {
    console.log(localStorage.key(0));
 }

 document.addEventListener("volumeupbutton", callbackFunction, false);  
 function callbackFunction() { 
   alert('Volume Up Button is pressed!');
 }

 document.addEventListener("backbutton", onBackKeyDown, false);  
 function onBackKeyDown(e) { 
   e.preventDefault(); 
   alert('Back Button is Pressed!'); 
 } 

 document.addEventListener("pause", onPauseKeyDown, false);  
 function onPauseKeyDown(e) { 
   e.preventDefault(); 
   console.log('Pause Button is Pressed!'); 
 } 

 document.addEventListener("resume", onResumeKeyDown, false);  
 function onResumeKeyDown(e) { 
   e.preventDefault(); 
   console.log('Resume Button is Pressed!'); 
 } */

 document.getElementById("cameraTakePicture").addEventListener("click", cameraTakePicture); 
 /*function cameraTakePicture() { 
    alert('root' + cordova.file.externalDataDirectory);
    navigator.camera.getPicture(onSuccess, onFail, {  
       quality: 50, 
       destinationType: Camera.DestinationType.FILE_URI  
    });  
    
    function onSuccess(imageData) { 
        console.log(imageData);
       var image = document.getElementById('myImage'); 
       //image.src =  "data:image/jpeg;base64," + imageData; 
    }  
    
    function onFail(message) { 
       alert('Failed because: ' + message); 
    } 

 } */
 
 function cameraTakePicture() { 
   
    window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fs) {

        console.log('file system open: ' + fs.name);
        getSampleFile(fs.root);
    
    }, onErrorLoadFs);

 }

 function onErrorLoadFs()
 {
     console.log('Error in file loading');
 }

 function getSampleFile(dirEntry) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://cordova.apache.org/static/img/cordova_bot.png', true);
    xhr.responseType = 'blob';

    xhr.onload = function() {
        if (this.status == 200) {

            var blob = new Blob([this.response], { type: 'image/png' });
            saveFile(dirEntry, blob, "downloadedImage.png");
        }
    };
    xhr.send();
}

function saveFile(dirEntry, fileData, fileName) {

    dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {

        writeFile(fileEntry, fileData);

    }, onErrorCreateFile);
}
function onErrorCreateFile()
{
    console.log('Error in file creating');
}

function writeFile(fileEntry, dataObj, isAppend) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
            if (dataObj.type == "image/png") {
                readBinaryFile(fileEntry);
            }
            else {
                readFile(fileEntry);
            }
        };

        fileWriter.onerror = function(e) {
            console.log("Failed file write: " + e.toString());
        };

        fileWriter.write(dataObj);
    });
}

function readBinaryFile(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {

            console.log("Successful file write: " + this.result);
            //displayFileData(fileEntry.fullPath + ": " + this.result);

            var blob = new Blob([new Uint8Array(this.result)], { type: "image/png" });
            displayImage(fileEntry);
        };

        reader.readAsArrayBuffer(file);

    }, onErrorReadFile);
}

function onErrorReadFile()
{
 console.log('Error in reading file');
}

function displayImage(blob) {
    
    // Displays image if result is a valid DOM string for an image.
    var elem = document.getElementById('myImage');
    // Note: Use window.URL.revokeObjectURL when finished with image.
    //var imgurl = window.URL.createObjectURL(blob);
    elem.src = blob.toURL();

}




 

// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.

$(function(){

//chrome.browserAction.setBadgeBackgroundColor({color:[0, 200, 0, 100]});
chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.action ==="saveGameConfig"){
            localStorage[request['localKeyName']]=request['localValue'];
        }
        if(request.action==="getGameConfig"){

        }
    });





});

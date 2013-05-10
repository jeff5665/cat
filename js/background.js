// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.

$(function(){

//chrome.browserAction.setBadgeBackgroundColor({color:[0, 200, 0, 100]});
chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.action ==="saveMyDeck"){
            //localStorage.setItem(request.lordName,request.deck);
        }
        if(request.action==="getAllDeck"){

        }
    });





});

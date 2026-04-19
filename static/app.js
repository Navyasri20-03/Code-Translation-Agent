async function translateCode() {
    var sourceCode = document.getElementById("source_code").value;
    var language = document.getElementById("language").value;
    var targetCode = document.getElementById("target_code");
    var statusMsg = document.getElementById("status_msg");

    if (sourceCode === "") {
        statusMsg.innerText = "Please enter some code.";
        return;
    }

    statusMsg.innerText = "Translating...";
    targetCode.value = "";

    try {
        let response = await fetch("/api/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                source_code: sourceCode,
                target_language: language
            })
        });

        let data = await response.json();
        
        if (response.ok) {
            targetCode.value = data.translated_code;
            statusMsg.innerText = "Success!";
            statusMsg.style.color = "var(--success)";
        } else {
            statusMsg.innerText = "Error: " + data.detail;
            statusMsg.style.color = "var(--danger)";
        }
    } catch (error) {
        statusMsg.innerText = "An error occurred.";
        statusMsg.style.color = "var(--danger)";
    }
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("source_code").value = e.target.result;
    };
    reader.readAsText(file);
}

async function explainCode() {
    var sourceCode = document.getElementById("source_code").value;
    var language = document.getElementById("language").value;
    var expOutput = document.getElementById("explanation_output");
    var statusMsg = document.getElementById("status_msg");

    if (sourceCode === "") {
        statusMsg.innerText = "Please enter some code.";
        return;
    }

    statusMsg.innerText = "Explaining...";
    expOutput.value = "Analyzing and explaining...";

    try {
        let response = await fetch("/api/explain", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                source_code: sourceCode,
                target_language: language
            })
        });

        let data = await response.json();
        
        if (response.ok) {
            expOutput.value = data.explanation;
            statusMsg.innerText = "Success!";
            statusMsg.style.color = "var(--success)";
        } else {
            statusMsg.innerText = "Error: " + data.detail;
            statusMsg.style.color = "var(--danger)";
        }
    } catch (error) {
        statusMsg.innerText = "An error occurred.";
        statusMsg.style.color = "var(--danger)";
    }
}

async function debugCode() {
    var sourceCode = document.getElementById("source_code").value;
    var language = document.getElementById("language").value;
    var expOutput = document.getElementById("explanation_output");
    var statusMsg = document.getElementById("status_msg");

    if (sourceCode === "") {
        statusMsg.innerText = "Please enter some code.";
        return;
    }

    statusMsg.innerText = "Debugging...";
    expOutput.value = "Checking for errors and debugging...";

    try {
        let response = await fetch("/api/debug", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                source_code: sourceCode,
                target_language: language
            })
        });

        let data = await response.json();
        
        if (response.ok) {
            expOutput.value = data.debug_result;
            statusMsg.innerText = "Success!";
            statusMsg.style.color = "var(--success)";
        } else {
            statusMsg.innerText = "Error: " + data.detail;
            statusMsg.style.color = "var(--danger)";
        }
    } catch (error) {
        statusMsg.innerText = "An error occurred.";
        statusMsg.style.color = "var(--danger)";
    }
}

function copyToClipboard(elementId) {
    var copyText = document.getElementById(elementId);
    
    if (!copyText.value) return;

    try {
        navigator.clipboard.writeText(copyText.value);
        var statusMsg = document.getElementById("status_msg");
        statusMsg.innerText = "Copied to clipboard!";
        statusMsg.style.color = "var(--success)";
        setTimeout(() => {
            if (statusMsg.innerText === "Copied to clipboard!") {
                statusMsg.innerText = "";
            }
        }, 2000);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}

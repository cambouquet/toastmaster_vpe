<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true displayRequiredFields=false showAnotherWayIfPresent=true>
<!DOCTYPE html>
<html class="${properties.kcHtmlClass!}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">

    <title>${msg("loginTitle",(realm.displayName!''))}</title>
    <link rel="icon" href="${url.resourcesPath}/img/favicon.ico" />
    <#if properties.styles?has_content>
        <#list properties.styles?split(' ') as style>
            <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=JetBrains+Mono:wght@100..800&display=swap');
    </style>
</head>

<body class="identity-lab guest-mode">
    <div class="background-logo">
        <svg viewBox="0 0 80 80" fill="#00bac4">
            <path d="M12 76 L15 4 L18 76 Z" />
            <path d="M18 32 Q50 4 75 18 L28 42 Z" />
            <path d="M10 42 L21 53 L18 56 L7 45 Z" />
            <path d="M18 50 Q50 68 76 78 L68 78 Q44 68 18 54 Z" />
        </svg>
    </div>

    <div class="neural-link-bootstrap">
        <#nested "header">
        
        <div id="kc-content">
            <div id="kc-content-wrapper">
                <#if displayMessage && message?has_content && (message.type != 'warning' || !isAppInitiatedAction??)>
                    <div class="alert-${message.type} ${properties.kcAlertClass!}">
                        <#if message.type = 'success'><span class="${properties.kcFeedbackSuccessIcon!}"></span></#if>
                        <#if message.type = 'warning'><span class="${properties.kcFeedbackWarningIcon!}"></span></#if>
                        <#if message.type = 'error'><span class="${properties.kcFeedbackErrorIcon!}"></span></#if>
                        <#if message.type = 'info'><span class="${properties.kcFeedbackInfoIcon!}"></span></#if>
                        <span class="kc-feedback-text">${message.summary}</span>
                    </div>
                </#if>

                <#nested "form">
            </div>
        </div>
    </div>

    <div class="guest-footer">
        K-APP.TECH/SECURE // NEURAL SYNC-77
    </div>

    <script src="${url.resourcesPath}/js/kfont.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            KFont.renderAll();
        });
    </script>
</body>
</html>
</#macro>
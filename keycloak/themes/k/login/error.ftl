<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=false; section>
    <#if section = "header">
        <div class="synced-status" id="id-wordmark-container">
            <div class="k-id-brand-container">
                <svg viewBox="0 0 80 80" fill="#ff0055" class="brand-svg">
                    <path d="M12 76 L15 4 L18 76 Z" />
                    <path d="M18 32 Q50 4 75 18 L28 42 Z" />
                    <path d="M10 42 L21 53 L18 56 L7 45 Z" />
                    <path d="M18 50 Q50 68 76 78 L68 78 Q44 68 18 54 Z" />
                </svg>
            </div>
        </div>
    <#elseif section = "form">
        <div id="kc-error-message">
            <div class="k-id-terminal-box">
                <div class="kfont-header" data-text="ERROR" data-height="60" data-color="#ff0055"></div>
                <div class="k-id-error-details">
                    <p class="instruction-text">${message.summary}</p>
                    <#if client?? && client.baseUrl?has_content>
                        <p><a id="backToApplication" href="${client.baseUrl}" class="action-btn">BACK TO TERMINAL</a></p>
                    </#if>
                </div>
            </div>
        </div>
    </#if>
</@layout.registrationLayout>

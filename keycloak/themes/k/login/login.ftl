<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=(social.displayInfo)!false displayMessage=!messagesPerField.existsError('username','password'); section>
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
        <form id="kc-form-login" action="${url.loginAction}" method="post">
            <div class="input-stack">
                <div class="input-bracket" id="username-bracket">
                    <label for="username">K ID</label>
                    <input id="username" name="username" value="${(login.username!'')}" type="hidden" />
                    <div id="username-display" class="kfont-input-display" onclick="setActiveField('username')"></div>
                    <#if messagesPerField.existsError('username')>
                        <span class="error-text">${messagesPerField.get('username')}</span>
                    </#if>
                </div>
                <div class="input-bracket" id="password-bracket" style="display: none;">
                    <label for="password">NEURAL KEY</label>
                    <input id="password" name="password" type="password" 
                           style="position: absolute; opacity: 0; pointer-events: none; height: 1px; width: 1px;" autocomplete="off" />
                    <div id="password-display" class="kfont-input-display" onclick="setActiveField('password')"></div>
                    <#if messagesPerField.existsError('password')>
                        <span class="error-text">${messagesPerField.get('password')}</span>
                    </#if>
                </div>
            </div>

            <div class="step-indicator">
                <div class="dot active" id="dot-username"></div>
                <div class="dot" id="dot-password"></div>
            </div>

            <div class="virtual-keyboard">
                <div class="keyboard-grid">
                    <#list "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"?split("") as char>
                        <button type="button" class="key" onclick="pressKey('${char}')" data-kfont="${char}"></button>
                    </#list>
                    <button type="button" class="key action backspace" onclick="pressBackspace()">DEL</button>
                </div>
            </div>

            <div class="identity-actions">
                <button type="button" class="sync-trigger" id="next-button" onclick="nextStep()" disabled>
                    <span>INITIATE SYNC</span>
                </button>
                <button type="submit" class="sync-trigger" id="submit-button" style="display: none;" disabled>
                    <span>AUTHORIZE SYNC</span>
                </button>
                <button type="button" class="back-trigger" id="back-button" style="display: none;" onclick="prevStep()">
                    REVISE ALIAS
                </button>
            </div>
        </form>

        <script>
            let currentField = 'username';
            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            const usernameDisplay = document.getElementById('username-display');
            const passwordDisplay = document.getElementById('password-display');
            const nextButton = document.getElementById('next-button');
            const submitButton = document.getElementById('submit-button');
            const backButton = document.getElementById('back-button');
            const kfontDisplay = document.getElementById('kfont-display');
            const flowLabel = document.getElementById('flow-label');

            function setActiveField(field) {
                currentField = field;
            }

            function pressKey(char) {
                const input = document.getElementById(currentField);
                if (input.value.length < 12) {
                    input.value += char;
                    updateUI();
                }
            }

            function pressBackspace() {
                const input = document.getElementById(currentField);
                input.value = input.value.slice(0, -1);
                updateUI();
            }

            function updateUI() {
                if (currentField === 'username') {
                    usernameDisplay.setAttribute('data-text', usernameInput.value || "K ID");
                    usernameDisplay.setAttribute('data-color', usernameInput.value ? "#fff" : "rgba(0,186,196,0.2)");
                    KFont.render(usernameDisplay);

                    nextButton.disabled = usernameInput.value.length < 3;
                    nextButton.classList.toggle('ready', !nextButton.disabled);
                } else {
                    passwordDisplay.setAttribute('data-text', "*".repeat(passwordInput.value.length) || "****");
                    passwordDisplay.setAttribute('data-color', passwordInput.value ? "#fff" : "rgba(0,186,196,0.2)");
                    KFont.render(passwordDisplay);
                    
                    submitButton.disabled = passwordInput.value.length < 4;
                    submitButton.classList.toggle('ready', !submitButton.disabled);
                }
            }

            function nextStep() {
                document.getElementById('username-bracket').style.display = 'none';
                document.getElementById('password-bracket').style.display = 'block';
                document.getElementById('dot-username').classList.remove('active');
                document.getElementById('dot-password').classList.add('active');
                nextButton.style.display = 'none';
                submitButton.style.display = 'block';
                backButton.style.display = 'block';
                currentField = 'password';
                updateUI();
            }

            function prevStep() {
                document.getElementById('username-bracket').style.display = 'block';
                document.getElementById('password-bracket').style.display = 'none';
                document.getElementById('dot-username').classList.add('active');
                document.getElementById('dot-password').classList.remove('active');
                nextButton.style.display = 'block';
                submitButton.style.display = 'none';
                backButton.style.display = 'none';
                currentField = 'username';
                updateUI();
            }

            // Support physical keyboard
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace') {
                    pressBackspace();
                } else if (e.key === 'Enter') {
                    if (currentField === 'username') {
                        if (!nextButton.disabled) nextStep();
                    } else if (currentField === 'password') {
                        document.getElementById('kc-form-login').submit();
                    }
                } else if (e.key.length === 1) {
                    const char = e.key.toUpperCase();
                    if ("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".includes(char)) {
                        pressKey(char);
                    }
                }
            });

            // Initial render
            window.onload = () => {
                KFont.renderAll();
                updateUI();
            };
        </script>
    </#if>
</@layout.registrationLayout>
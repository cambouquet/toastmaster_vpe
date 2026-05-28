<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=(social.displayInfo)!false displayMessage=!messagesPerField.existsError('username','password'); section>
    <#if section = "header">
        <div class="synced-status" id="id-wordmark-container">
            <div class="k-id-brand-container">
                <svg viewBox="0 0 80 80" class="brand-svg">
                    <path d="M12 76 L15 4 L18 76 Z" fill="#ffffff" />
                    <path d="M18 32 Q50 4 75 18 L28 42 Z" fill="#ff0055" />
                    <path d="M10 42 L21 53 L18 56 L7 45 Z" fill="#ffffff" />
                    <path d="M18 50 Q50 68 76 78 L68 78 Q44 68 18 54 Z" fill="#ffffff" />
                </svg>
            </div>
        </div>
    <#elseif section = "form">
        <form id="kc-form-login" action="${url.loginAction}" method="post">
            <div class="input-stack">
                <div class="input-bracket" id="username-bracket">
                    <label for="username">MAIL ADDRESS</label>
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
                    <#list "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.@_-"?split("") as char>
                        <button type="button" class="key" 
                                onclick="pressKey('${char}')" 
                                data-kfont="${char}">${char}</button>
                    </#list>
                    <button type="button" class="key action backspace" 
                            onclick="pressBackspace()"
                            data-kfont="VOID">VOID</button>
                    <button type="button" class="key action enter" id="k-enter-key" 
                            onclick="pressEnter()" 
                            data-kfont="ENTER" disabled>ENTER</button>
                </div>
            </div>

            <div class="identity-actions">
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

            function pressEnter() {
                if (currentField === 'username' && !nextButton.disabled) {
                    nextStep();
                } else if (currentField === 'password' && !submitButton.disabled) {
                    document.getElementById('kc-form-login').submit();
                }
            }

            function updateUI() {
                const enterKey = document.getElementById('k-enter-key');
                if (currentField === 'username') {
                    usernameDisplay.setAttribute('data-text', usernameInput.value || "MAIL ADDR");
                    usernameDisplay.setAttribute('data-color', usernameInput.value ? "#fff" : "rgba(0,186,196,0.2)");
                    KFont.render(usernameDisplay);

                    const isReady = usernameInput.value.length >= 5 && usernameInput.value.includes('@');
                    enterKey.disabled = !isReady;
                    enterKey.classList.toggle('ready', isReady);
                } else {
                    passwordDisplay.setAttribute('data-text', "*".repeat(passwordInput.value.length) || "****");
                    passwordDisplay.setAttribute('data-color', passwordInput.value ? "#fff" : "rgba(0,186,196,0.2)");
                    KFont.render(passwordDisplay);
                    
                    const isReady = passwordInput.value.length >= 4;
                    enterKey.disabled = !isReady;
                    enterKey.classList.toggle('ready', isReady);
                    submitButton.disabled = !isReady;
                }
            }

            function nextStep() {
                if (usernameInput.value.length < 5 || !usernameInput.value.includes('@')) return;
                document.getElementById('username-bracket').style.display = 'none';
                document.getElementById('password-bracket').style.display = 'block';
                document.getElementById('dot-username').classList.remove('active');
                document.getElementById('dot-password').classList.add('active');
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
                    pressEnter();
                } else if (e.key.length === 1) {
                    const char = e.key.toUpperCase();
                    if ("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.@_-".includes(char)) {
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
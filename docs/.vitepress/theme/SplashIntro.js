import { ref, onMounted, onUnmounted } from 'vue';

export default {
  setup() {
    const roles = ['WARRIOR', 'WOMAN', 'MAN', 'HUMAN'];
    const displayRole = ref('WARRIOR');
    const isVisible = ref(true);

    const scrambleTo = (word) => {
      let its = 0;
      const chars = '!@#$%^&*()_+{}[]|;:,.<>?';
      const scr = setInterval(() => {
        displayRole.value = word.split("").map((c, i) => 
          i < its ? word[i] : chars[Math.floor(Math.random() * chars.length)]
        ).join("");
        if (its >= word.length) clearInterval(scr);
        its += 1;
      }, 20);
    };

    onMounted(() => {
      let roleIdx = 0;
      const roleTimer = setInterval(() => {
        roleIdx++;
        if (roleIdx < roles.length) {
          scrambleTo(roles[roleIdx]);
        } else {
          clearInterval(roleTimer);
          setTimeout(() => {
            isVisible.value = false;
          }, 1500);
        }
      }, 1000);

      onUnmounted(() => clearInterval(roleTimer));
    });

    return { displayRole, isVisible };
  },
  template: `
    <Transition name="fade">
      <div v-if="isVisible" class="splash-overlay">
        <div class="splash-content">
          <div class="motto-container">
            <div class="line-1">THE GAME LIFE</div>
            <div class="line-2">BECOME THE <span class="highlight">{{ displayRole }}</span></div>
            <div class="line-3">YOU'RE MEANT TO BE</div>
          </div>
        </div>
      </div>
    </Transition>
  `
};
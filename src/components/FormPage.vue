<template>
  <div>
    <form>
      <label for="uId">User ID:</label>
      <input v-model="uId" type="text" id="uId" required>
      <label for="activityId">Activity ID:</label>
      <input v-model="activityId" type="text" id="activityId" required>
      <button type="submit" @click="submitForm">Submit</button>
    </form>
  </div>
</template>


<script>
import { useRouter } from 'vue-router';

export default {
  name: "FormPage",
  data() {
    return {
      uId: '',
      activityId: '',
      router: useRouter(),
    };
  },
  methods: {
    submitForm(event) {
      event.preventDefault();
      console.log("submitForm called");
      console.log("uId:", this.uId);
      console.log("activityId:", this.activityId);
      const router = this.router;
      const uId = this.uId;
      const activityId = this.activityId;
      /** 在提交时导航到 Lucky.vue，并传递参数 */
      router.push({
        path: '/lucky',
        query: {
          uId: uId,
          activityId: activityId,
        },
      });
    },
  },
}
</script>


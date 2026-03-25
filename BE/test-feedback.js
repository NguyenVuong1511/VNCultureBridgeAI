const feedbackService = require('./src/modules/feedback/feedback.service');

async function test() {
  try {
    const res = await feedbackService.getPublicFeedbacks({ type: 'CHUNG' });
    console.log("Success:", res);
  } catch (err) {
    console.error("Error occurred:", err);
  }
  process.exit(0);
}

test();

// Model untuk pesan dalam konseling
class CounselingMessage {
    constructor(senderId, receiverId, message) {
      this.senderId = senderId;
      this.receiverId = receiverId;
      this.message = message;
      this.createdAt = new Date();
    }
  }
  
  module.exports = CounselingMessage;
  
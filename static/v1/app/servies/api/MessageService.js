angular.module('requesterModule').factory('MessageService', ['ZeusService', function(ZeusService) {
  var route = 'SP';
  var actionMap = {
    CreateMessage: 'Complaint_Create',
    CreateMessageReply: 'Complaint_Reply_Create',
    GetMessageList: 'MessageList_Get',
    GetMessageReplyList: 'Complaint_ReplyList_Get',
    GetMessageTypeList: 'Thesaurus_GetByLanguageCode',
    DeleteMessage: 'Message_TrashStatus_Update',
    ContactUs_Create: 'ContactUs_Create'
  };
  return {
    call: function(action, data, callback) {
      if (actionMap[action] !== undefined) {
        return ZeusService.call([route, actionMap[action]], data, callback);
      } else {
        console.log(route, action + ' is not defined...');
      }
    }
  };
}]);

angular.module('requesterModule').factory('MessageService', ['ZeusService', function(ZeusService) {
  var route = 'Message';
  var actionMap = {
    CreateMessage: 'Complaint_Create',
    CreateMessageReply: 'Complaint_Reply_Create',
    GetMessageList: 'Get',
    GetMessageReplyList: 'Complaint_ReplyList_Get',
    GetMessageTypeList: 'Thesaurus_GetByLanguageCode',
    DeleteMessage: 'Del',
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

module.exports = {
  getUser: function(client, user, id=true) { // Get user infos
    // getUser(client, user) // Get only user id
    // getUser(client, user, false) // Get full user info
    if(!user) return false;
    var usrID = user.replace(/[<>@&!']/g, "").replace(/ /g, '');
    try {
      if(id)
        return client.users.cache.get(usrID).id; 
      else
        return client.users.cache.get(usrID);
    } catch (e) {
      return false;
    }
  }
}
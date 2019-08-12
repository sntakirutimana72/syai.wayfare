//API to get retrieve Account information rendered with the session view 
//And prep the information for assignment

const assignUserAccountInfo = () => {
  try {
    const { gender: ge, email: em, firstname: fi } = data.me;
    $('div[user-acc] i').text(`Hello, ${{ 'f': 'Mrs', 'm': 'Mr', 'c': '' }[ge[0]]} ${fi}`);
    $('div[user-acc] span[em]').text(`Signed in as ${em}`);
  } catch (error) {
    $('div[user-acc] i').text('Hello. Welcome');
    $('div[user-acc] span[em]').text(`Information not available right now`);
  }
};

$(document).ready(assignUserAccountInfo);

const getUserInfo = async function (user_id, user_id_type = 'user_id') {
  const url = `https://open.feishu.cn/open-apis/contact/v3/users/${user_id}`
  try {
    const res = await this.axios.get(url, {
      params: {
        user_id_type,
      },
    })
    return res.data
  } catch (err) {
    return err
  }
}

module.exports = {
  getUserInfo,
}

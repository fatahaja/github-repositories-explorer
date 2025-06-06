export const parseUsers = (inputData: { [key: string]: string | number }[]) => {
  const data = inputData.map((item) => {
    return {
      username: item.login,
    };
  });

  return data;
};

export const parseRepos = (inputData: { [key: string]: string | number }[]) => {
  const data = inputData.map((item) => {
    return {
      id: item.id,
      name: item.name,
      desc: item.description,
      star_count: item.stargazers_count,
      url: item.html_url,
    };
  });

  return data;
};

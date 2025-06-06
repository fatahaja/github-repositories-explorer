import StarFill from "../assets/icons/star-fill"

export interface IRepositoryData {
  id: number,
  name: string,
  desc: string,
  star_count: number,
  url: string,
}

interface IProps {
  repoData?: IRepositoryData[],
}

const ListRepository = (props: IProps) => {
  const handleGoToGithubPage = (url: string) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!props?.repoData?.length) {
    return (<></>)
  }

  return (
    <div className="relative flex flex-col gap-3 pt-3">
      {props.repoData.map((repo) => {
        return (
          <div key={`list-repo-${repo.id}`} className="hover:bg-stone-200 cursor-pointer ml-4 px-2 py-2 bg-stone-300 min-h-24" onClick={() => handleGoToGithubPage(repo.url)}>
            <div className="flex items-center justify-between">
              <p className="font-bold">{repo.name}</p>
              <div className="flex font-bold items-center-safe justify-center gap-2">
                <p>{repo.star_count}</p>
                <div className="h-[16px]"><StarFill /></div>
              </div>
            </div>
            <p>{repo.desc}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ListRepository
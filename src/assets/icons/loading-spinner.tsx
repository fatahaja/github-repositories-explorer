interface IProps {
  variant: "light" | "dark"
}
const LoadingSpinner = ({ variant }: IProps) => (
  <svg width="100%" height="100%" viewBox="-1.6 -1.6 19.20 19.20" xmlns="http://www.w3.org/2000/svg" fill="none" className="hds-flight-icon--animation-loading" stroke="" strokeWidth="0.00016"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.16"></g><g id="SVGRepo_iconCarrier"> <g fill={variant == "light" ? "#ffffff" : "#213547"} fillRule="evenodd" clipRule="evenodd"> <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" opacity=".2"></path> <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"></path> </g> </g></svg>
)
export default LoadingSpinner;



export const Container = ({ children }) => {
  return (
    <div
      className="home-container"
      style={{
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '48px',
        margin: '0 auto',
        maxWidth: '1080px',
      }}>
      {children}
    </div>
  )
}

export const OutputTabsContainer = ({ children }) => {
  return (
    <div
      className="home-container"
      style={{
        paddingLeft: '20px',
        paddingRight: '20px',
        margin: '0 auto',
        maxWidth: '1080px',
      }}>
      {children}
    </div>
  )
}

export const OutputContainer = ({ children }) => {
  return (
    <div
      className="home-container"
      style={{
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '32px',
        margin: '0 auto',
        maxWidth: '1200px',
      }}>
      {children}
    </div>
  )
}

export const OutputContainerWithBottomPadding = ({ children, className="" }) => {
  return (
    <div
      className={className}
      style={{
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '32px',
        margin: '0 auto',
        maxWidth: '1200px',
      }}>
      {children}
    </div>
  )
}

export const TabWrapper = ({ children }) => {
  return <div className="workspace-body">{children}</div>
}

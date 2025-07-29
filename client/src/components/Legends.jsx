const Legends = ({ legends }) => {
    return (
        <div>
            <h1>NBA Legends</h1>
            {
                legends.map((legend) => {
                  return(
                    <ul key={legend.id}>
                        <li>{legend.first_name} {legend.last_name}</li>
                    </ul>
                  )
                })
            }
        </div>
    )
}

export default Legends
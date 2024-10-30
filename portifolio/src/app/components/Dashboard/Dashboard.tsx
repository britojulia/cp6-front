interface DashboardCardProps {
    title: string;
    count: number;
    icon: React.ReactElement;
}

const DashboardCard = ({title, count, icon}: DashboardCardProps) => {
    return <div className="">
                <div>
                    <h3>{title}</h3>
                    <div>
                        {/*aqui vem um icone*/}{icon}
                        <h3>
                            {count}
                        </h3>
                    </div>
                </div>
            </div>
}

export default DashboardCard;
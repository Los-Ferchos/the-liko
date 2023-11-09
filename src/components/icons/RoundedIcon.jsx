const RoundedIcon = ({ icon: IconComponent  }) => (
    <div className="rounded-icon" style={{ width: 32, height: 32 }}>
        <IconComponent color="white" size={24} />
    </div>
)

export default RoundedIcon;
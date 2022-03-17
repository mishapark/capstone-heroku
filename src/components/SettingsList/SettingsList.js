import React from "react";
import SettingsCard from "../SettingsCard/SettingsCard";

function SettingsList({ title, cards }) {
  const getContent = () => {
    if (title !== "Anyone") {
      return (
        <>
          <div
            style={{ display: "flex", flexWrap: "wrap", marginLeft: "-10px" }}
          >
            {cards.map((c) => (
              <SettingsCard
                key={c.title}
                title={c.title}
                color={c.color}
                icon={c.icon}
                menuOptions={c.menuOptions}
                optionsColor={c.optionsColor}
              />
            ))}
          </div>
        </>
      );
    }
    if (title === "Anyone") {
      return (
        <>
          <div
            style={{ display: "flex", flexWrap: "wrap", marginLeft: "-10px" }}
          >
            {cards.map((c) => (
              <SettingsCard
                key={c.title}
                title={c.title}
                color={c.color}
                icon={c.icon}
                menuOptions={c.menuOptions}
                optionsColor={c.optionsColor}
                info={c.info}
              />
            ))}
          </div>
        </>
      );
    }
  };

  return <>{getContent()}</>;
}

export default SettingsList;

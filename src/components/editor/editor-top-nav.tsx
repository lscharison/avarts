import React from "react";
import { InputWithSearchAddon } from "../ui/input-search-addon";
import { Typography } from "@material-tailwind/react";
import { CompanyLogo } from "../company-logo";

export const EditorTopNav = () => {
  return (
    <div className="flex items-center justify-between h-16 rounded border-solid border-4 border-gray-500 bg-gray-800">
      <InputWithSearchAddon onChange={() => {}} value="Search the deck" />
      <div className="flex items-center justify-between gap-1">
        <Typography variant="h4" color="white">
          THE ATRIUM
        </Typography>
        <Typography variant="small" color="white" className="mt-2">
          BOSTON MA
        </Typography>
      </div>
      <CompanyLogo inverse={true} variant="h6" iconSize="h-4 w-4" />
    </div>
  );
};

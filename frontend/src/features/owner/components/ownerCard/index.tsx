import { FC } from "react";
import PhoneIcon from "../../../../assets/icons/phoneIcon.svg";
import EmailIcon from "../../../../assets/icons/emailIcon.svg";
import { TOwnerData } from "../../shared/types";
import { OnwerCard, OwnerName, SocialBlock, SimpleText } from "./styles";

interface TOwnerCard {
  data: TOwnerData;
  ownerId: string;
}

export const OwnerCard: FC<TOwnerCard> = ({ data, ownerId }) => {
  return (
    <OnwerCard>
      {ownerId && (
        <>
          <OwnerName>{data?.name}</OwnerName>
          <SocialBlock>
            <img src={PhoneIcon} alt={"phone"} />
            <SimpleText>{data?.phone}</SimpleText>
          </SocialBlock>
          <SocialBlock>
            <img src={EmailIcon} alt={"phone"} />
            <SimpleText>{data?.email}</SimpleText>
          </SocialBlock>
        </>
      )}
    </OnwerCard>
  );
};

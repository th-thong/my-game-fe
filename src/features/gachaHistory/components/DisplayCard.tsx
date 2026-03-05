import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useBannerStore } from "@/features/banner/store/useBannerStore";
import { Filter } from "./CardHeader";
import { SwitchView } from "./CardHeader";
import { AvatarWithCount } from "./CharacterIcon";
import YangYang from "./T_IconRoleHead150_1.png";

export function GachaHistoryDisplayCard() {
  const bannerId = useBannerStore((state) => state.bannerId);

  return (
    <Card className="min-h-120 border-none">
      <CardHeader className="flex flex-row items-center justify-end gap-7">
        <Filter></Filter>
        <SwitchView></SwitchView>
      </CardHeader>

      <CardContent>
        {bannerId == 0 && (
          <div className="flex flex-wrap gap-4">
            <AvatarWithCount imageSrc={YangYang} count={61} />
            <AvatarWithCount imageSrc={YangYang} count={12} />
            <AvatarWithCount imageSrc={YangYang} count={5} />
            <AvatarWithCount imageSrc={YangYang} count={99} />
            <AvatarWithCount imageSrc={YangYang} count={1} />
            <AvatarWithCount imageSrc={YangYang} count={30} />
            <AvatarWithCount imageSrc={YangYang} count={45} />
            <AvatarWithCount imageSrc={YangYang} count={45} />
            <AvatarWithCount imageSrc={YangYang} count={45} />
            <AvatarWithCount imageSrc={YangYang} count={45} />
            <AvatarWithCount imageSrc={YangYang} count={45} />
            <AvatarWithCount imageSrc={YangYang} count={45} />
            <AvatarWithCount imageSrc={YangYang} count={45} />
            <AvatarWithCount imageSrc={YangYang} count={45} />
            <AvatarWithCount imageSrc={YangYang} count={45} />
            <AvatarWithCount imageSrc={YangYang} count={45} />
          </div>
        )}
        {bannerId == 1 && <h1>1</h1>}
        {bannerId == 2 && <h1>2</h1>}
        {bannerId == 3 && <h1>3</h1>}
        {bannerId == 4 && <h1>4</h1>}
        {bannerId == 5 && <h1>5</h1>}
        {bannerId == 6 && <h1>6</h1>}
      </CardContent>
    </Card>
  );
}

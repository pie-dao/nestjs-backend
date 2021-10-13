import { ValidateNested, IsString, isString, IsNotEmpty, IsArray } from "class-validator";
import { Type } from "class-transformer";

export class SupportedNetworksDTO {
    /**
     * Wrap the array in a 'data' property
     */
    @ValidateNested({ each: true })
    @Type(() => SupportedNetwork)
    data: SupportedNetwork;
}

class SupportedNetwork {
    /**
     * We only need validations for fields required in subsequent api calls
     */
    @ValidateNested({ each: true })
    @Type(() => App)
    apps: App[];

    @IsString()
    @IsNotEmpty()
    network: string;
}

class App {
    @IsString()
    @IsNotEmpty()
    appId: string;

    meta: Meta;
}

class Meta {
    label: string;
    img: string;
    tags: string[];
    supportedActions: SupportedAction[];
}

class SupportedAction {
    Transact = "transact";
    View = "view";
}
import { CRFRNFF, RCRFNFF, FRCRNFF, RFRCNFF } from "./tile1";
import { CFCFNFF, FCFCNFF } from "./tile10";
import { CCFFNFF, CFFCNFF, FCCFNFF, FFCCNFF } from "./tile11";
import { CFCFNTT, FCFCNTT } from "./tile12";
import { CFCFNTF, FCFCNTF } from "./tile13";
import { CCRRNTT, CRRCNTT, RCCRNTT, RRCCNTT } from "./tile14";
import { CCRRNTF, CRRCNTF, RCCRNTF, RRCCNTF } from "./tile15";
import { CCFFNTT, CFFCNTT, FCCFNTT, FFCCNTT } from "./tile16";
import { CCFFNTF, CFFCNTF, FCCFNTF, FFCCNTF } from "./tile17";
import { CCCRNTT, CCRCNTT, CRCCNTT, RCCCNTT } from "./tile18";
import { CCCRNTF, CCRCNTF, CRCCNTF, RCCCNTF } from "./tile19";
import { RRRRNFF } from "./tile2";
import { CCCFNTT, CCFCNTT, CFCCNTT, FCCCNTT } from "./tile20";
import { CCCFNTF, CCFCNTF, CFCCNTF, FCCCNTF } from "./tile21";
import { CCCCNTT } from "./tile22";
import { FFFRMFF, FFRFMFF, FRFFMFF, RFFFMFF } from "./tile23";
import { FFFFMFF } from "./tile24";
import { FRRRNFF, RFRRNFF, RRFRNFF, RRRFNFF } from "./tile3";
import { FFRRNFF, FRRFNFF, RFFRNFF, RRFFNFF } from "./tile4";
import { FRFRNFF, RFRFNFF } from "./tile5";
import { CRRRNFF, RCRRNFF, RRCRNFF, RRRCNFF } from "./tile6";
import { CRRFNFF, FCRRNFF, RFCRNFF, RRFCNFF } from "./tile7";
import { CFRRNFF, FRRCNFF, RCFRNFF, RRCFNFF } from "./tile8";
import { CFFFNFF, FCFFNFF, FFCFNFF, FFFCNFF } from "./tile9";

// Tile Notation

// Top Structure + Right Structure + Bottom Structure + Left Structure + Center Structure + CityConn + Banner

// EX: CRFRNFF 
// - C: City top of tile
// - R: Road right side of tile
// - F: Farm bottom of tile
// - R: Road left side of tile
// - N: Nothing in center of tile
// - F: No cities connected
// - F: No banner on city

export const TILES = {
    "CRFRNFF": CRFRNFF, "RCRFNFF": RCRFNFF, "FRCRNFF": FRCRNFF, "RFRCNFF": RFRCNFF,

    "RRRRNFF": RRRRNFF,

    "FRRRNFF": FRRRNFF, "RFRRNFF": RFRRNFF, "RRFRNFF": RRFRNFF, "RRRFNFF": RRRFNFF,

    "FFRRNFF": FFRRNFF, "RFFRNFF": RFFRNFF, "RRFFNFF": RRFFNFF, "FRRFNFF": FRRFNFF,

    "RFRFNFF": RFRFNFF, "FRFRNFF": FRFRNFF,

    "CRRRNFF": CRRRNFF, "RCRRNFF": RCRRNFF, "RRCRNFF": RRCRNFF, "RRRCNFF": RRRCNFF,

    "CRRFNFF": CRRFNFF, "FCRRNFF": FCRRNFF, "RFCRNFF": RFCRNFF, "RRFCNFF": RRFCNFF,

    "CFRRNFF": CFRRNFF, "RCFRNFF": RCFRNFF, "RRCFNFF": RRCFNFF, "FRRCNFF": FRRCNFF,

    "CFFFNFF": CFFFNFF, "FCFFNFF": FCFFNFF, "FFCFNFF": FFCFNFF, "FFFCNFF": FFFCNFF,

    "CFCFNFF": CFCFNFF, "FCFCNFF": FCFCNFF,

    "CFFCNFF": CFFCNFF, "CCFFNFF": CCFFNFF, "FCCFNFF": FCCFNFF, "FFCCNFF": FFCCNFF,

    "FCFCNTT": FCFCNTT, "CFCFNTT": CFCFNTT,

    "FCFCNTF": FCFCNTF, "CFCFNTF": CFCFNTF,

    "CRRCNTT": CRRCNTT, "CCRRNTT": CCRRNTT, "RCCRNTT": RCCRNTT, "RRCCNTT": RRCCNTT,

    "CRRCNTF": CRRCNTF, "CCRRNTF": CCRRNTF, "RCCRNTF": RCCRNTF, "RRCCNTF": RRCCNTF,

    "CFFCNTT": CFFCNTT, "CCFFNTT": CCFFNTT, "FCCFNTT": FCCFNTT, "FFCCNTT": FFCCNTT,

    "CFFCNTF": CFFCNTF, "CCFFNTF": CCFFNTF, "FCCFNTF": FCCFNTF, "FFCCNTF": FFCCNTF,

    "CCRCNTT": CCRCNTT, "CCCRNTT": CCCRNTT, "RCCCNTT": RCCCNTT, "CRCCNTT": CRCCNTT,

    "CCRCNTF": CCRCNTF, "CCCRNTF": CCCRNTF, "RCCCNTF": RCCCNTF, "CRCCNTF": CRCCNTF,

    "CCFCNTT": CCFCNTT, "CCCFNTT": CCCFNTT, "FCCCNTT": FCCCNTT, "CFCCNTT": CFCCNTT,

    "CCFCNTF": CCFCNTF, "CCCFNTF": CCCFNTF, "FCCCNTF": FCCCNTF, "CFCCNTF": CFCCNTF,

    "CCCCNTT": CCCCNTT,

    "FFRFMFF": FFRFMFF, "FFFRMFF": FFFRMFF, "RFFFMFF": RFFFMFF, "FRFFMFF": FRFFMFF,

    "FFFFMFF": FFFFMFF
}
import { Component } from "@angular/core";
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
} from "@ionic/angular";
import {
  ActivatedRoute,
  NavigationExtras,
  Router,
  NavigationEnd,
} from "@angular/router";

import { DataService } from "src/app/api/data.service";
import { PatternService } from "src/app/api/pattern.service";
import { UserService } from "src/app/services/user.service";
import { Paging } from "../../models/server-request";

// const testList = [763264, 763263, 17, 20, 766149];
const famousList = [
  10, 16, 17, 20, 29, 38, 40, 45, 54, 58, 66, 69, 71, 74, 87, 88, 91, 92, 108,
  112, 117, 125, 130, 133, 140, 144, 167, 176, 177, 185, 187, 190, 192, 195,
  203, 218, 220, 254, 255, 268, 269, 270, 278, 358, 362, 367, 369, 383, 386,
  423, 424, 453, 456, 457, 477, 482, 494, 510, 513, 530, 533, 548, 558, 563,
  573, 574, 577, 594, 605, 606, 610, 620, 632, 656, 658, 659, 683, 710, 742,
  744, 759, 770, 804, 805, 835, 840, 855, 862, 888, 892, 903, 905, 917, 930,
  934, 951, 953, 954, 958, 959, 983, 990, 1066, 1080, 1083, 1135, 1149, 1191,
  1192, 1195, 1197, 1262, 1282, 1306, 1334, 1340, 1379, 1399, 1402, 1421, 1461,
  1465, 1539, 1549, 1551, 1557, 1648, 1682, 1683, 1700, 1709, 1717, 1725, 1742,
  1768, 1770, 1787, 1806, 1885, 2037, 2078, 2099, 2111, 2122, 2188, 2205, 2209,
  2219, 2255, 2256, 2282, 2303, 2308, 2310, 2357, 2366, 2450, 2485, 2505, 2518,
  2520, 2525, 2663, 2665, 2687, 2774, 2786, 2848, 2862, 2889, 2918, 2929, 3002,
  3071, 3111, 3131, 3134, 3156, 3183, 3199, 3236, 3315, 3329, 3397, 3417, 3418,
  3437, 3439, 3440, 3654, 3665, 3750, 3758, 3870, 3892, 4000, 4018, 4063, 4124,
  4147, 4148, 4150, 4172, 4177, 4221, 4284, 4287, 4391, 4396, 4448, 4500, 4517,
  4571, 4597, 4726, 4735, 4764, 4865, 5047, 5106, 5146, 5241, 5330, 5454, 5523,
  5532, 5551, 5615, 5623, 5649, 5823, 5873, 5889, 5913, 6026, 6232, 6346, 6362,
  6383, 6389, 6528, 6572, 6778, 6783, 6811, 6831, 7111, 7114, 7124, 7145, 7169,
  7236, 7271, 7345, 7393, 7432, 7905, 7910, 7918, 7928, 8066, 8166, 8581, 8651,
  8654, 8689, 8710, 8742, 8915, 8964, 9044, 9295, 9419, 9572, 9634, 9639, 9641,
  9819, 10075, 10131, 10314, 10325, 10562, 10571, 10760, 10766, 10941, 11191,
  11301, 11330, 11466, 11720, 11732, 11744, 12240, 12682, 12915, 13003, 13061,
  13651, 13655, 14019, 14053, 14072, 14129, 14308, 14449, 14598, 14617, 14677,
  14680, 14681, 14725, 15062, 15129, 15218, 15251, 15390, 15588, 15700, 15743,
  15789, 15846, 16089, 16282, 16378, 16476, 16520, 16647, 16715, 16973, 17017,
  17060, 17160, 17222, 17272, 17277, 17468, 17533, 17576, 17606, 17813, 18017,
  18179, 18540, 18567, 18646, 18710, 18904, 18955, 19089, 19363, 19534, 19774,
  19864, 19998, 20058, 20111, 20140, 20222, 20275, 20280, 20292, 20305, 20309,
  20348, 20355, 20356, 20518, 20541, 20613, 20784, 20830, 21010, 21029, 21062,
  21570, 21573, 21580, 21582, 21586, 21590, 21600, 21776, 22159, 22238, 22347,
  22427, 22711, 22745, 22758, 22952, 22956, 23006, 23118, 23503, 23753, 24055,
  24062, 24402, 24566, 24651, 24863, 25038, 25264, 25650, 25653, 25691, 25696,
  26109, 26131, 26184, 26307, 26444, 26471, 26563, 26696, 26820, 26924, 26945,
  26988, 27077, 27691, 27863, 28108, 28113, 28718, 28724, 28795, 28824, 29010,
  29072, 29255, 29261, 29354, 29717, 29938, 29951, 30126, 30209, 30505, 30716,
  30808, 30928, 31200, 31249, 31422, 31435, 31517, 31624, 32008, 32068, 32076,
  32085, 32464, 32528, 32541, 32815, 33207, 33425, 33804, 34011, 34137, 34235,
  34267, 34579, 34797, 34950, 35132, 35196, 35716, 35882, 35932, 36133, 36167,
  36281, 36299, 36724, 37092, 37198, 37228, 37689, 37747, 37840, 37844, 37845,
  37859, 37861, 37872, 37880, 37888, 37901, 38110, 38123, 38141, 38156, 38274,
  38364, 38460, 38821, 38908, 38960, 39101, 39154, 39236, 39289, 39326, 39371,
  39858, 39925, 40183, 40292, 40344, 40352, 40424, 40997, 41354, 41693, 41717,
  41964, 42054, 42080, 42111, 42552, 42638, 42926, 43832, 43900, 43946, 44122,
  44131, 44180, 44243, 44423, 44425, 44964, 45551, 45618, 45880, 46142, 46338,
  46485, 46500, 46539, 46610, 46613, 46656, 46797, 47191, 47195, 47267, 47372,
  47395, 47530, 47558, 47584, 47864, 48174, 48316, 48844, 48911, 49500, 49506,
  49967, 50155, 50513, 50658, 51116, 51213, 51311, 51452, 51521, 52332, 52697,
  52961, 53009, 53121, 53209, 53272, 53332, 53466, 53679, 54358, 54472, 54513,
  54573, 54585, 54900, 55034, 55161, 55192, 55264, 55271, 55273, 55278, 55279,
  55280, 55283, 55289, 55302, 55304, 55308, 55714, 55933, 56091, 56281, 56417,
  56527, 56580, 56615, 56679, 57023, 57200, 57227, 57230, 57407, 57424, 57426,
  57451, 57973, 58314, 58348, 58443, 58467, 58502, 58550, 58564, 58700, 58778,
  58840, 59321, 59608, 59823, 59988, 60263, 60286, 60536, 60742, 61010, 61398,
  62031, 62228, 62247, 62254, 62455, 62997, 63060, 63104, 63144, 63146, 63207,
  63254, 63261, 63276, 63371, 63741, 64113, 64300, 64382, 64404, 64808, 65053,
  65462, 65754, 65831, 65918, 65923, 65956, 66310, 66363, 66379, 66726, 66962,
  66986, 67303, 67661, 67692, 67844, 67993, 68092, 68170, 68244, 68341, 68527,
  68540, 68687, 69066, 69145, 69168, 69170, 69174, 69180, 69252, 69344, 69518,
  69560, 69602, 70009, 70093, 70659, 70678, 70789, 70843, 71111, 71257, 71391,
  71665, 71773, 71930, 72078, 72399, 73106, 73158, 73207, 73209, 73878, 74682,
  75475, 75614, 75857, 75861, 75950, 76014, 76136, 76412, 76776, 76816, 76823,
  76914, 77167, 77208, 77370, 77372, 77478, 77538, 78072, 78220, 78651, 79395,
  79487, 79499, 79955, 80098, 80431, 80472, 80803, 81010, 81110, 81125, 81222,
  81290, 81687, 81934, 81974, 82060, 82107, 82354, 82416, 82721, 82774, 82820,
  82870, 82947, 83289, 83296, 83825, 83874, 84254, 84263, 84274, 84280, 84295,
  84297, 84299, 84300, 84312, 84314, 84430, 84536, 84804, 85421, 85518, 85766,
  85977, 85985, 86008, 86091, 86363, 86415, 86685, 86763, 86901, 87497, 87631,
  87647, 87662, 87705, 87816, 87932, 88047, 88234, 88285, 88286, 88325, 88478,
  88603, 88765, 88779, 88948, 89118, 89172, 89177, 89187, 89363, 89541, 89751,
  89765, 89882, 90065, 90797, 90939, 90986, 91202, 91222, 91257, 91286, 91369,
  91531, 91562, 91719, 91784, 91885, 92127, 92217, 92240, 92988, 93044, 93085,
  93282, 93370, 93461, 93705, 93811, 94175, 94377, 94510, 94515, 94530, 94566,
  94641, 94650, 94855, 94856, 95384, 95493, 95513, 95591, 95695, 95742, 95781,
  95789, 95856, 96082, 96269, 96380, 96581, 96590, 96851, 96855, 96914, 97019,
  97042, 97068, 97168, 97222, 97401, 97430, 97457, 97592, 97893, 97913, 98092,
  98175, 98405, 98410, 98419, 98428, 98434, 98438, 98466, 99026, 99097, 99381,
  99565, 99715, 99747, 99889, 99945, 100315, 100425, 100489, 100534, 100542,
  100747, 100850, 101329, 102193, 102322, 102441, 102576, 102701, 103201,
  103532, 103556, 103626, 103767, 103864, 103931, 104640, 104642, 104649,
  104657, 104667, 105087, 105452, 105497, 105570, 105705, 105732, 105853,
  105865, 106030, 106061, 106251, 106389, 106405, 106427, 106462, 106475,
  106714, 106818, 106823, 106867, 106905, 107018, 107267, 107295, 107648,
  107707, 107753, 107832, 107844, 107900, 107929, 108023, 108431, 108742,
  109329, 109675, 109795, 109939, 110302, 110399, 110524, 110660, 111119,
  111517, 111636, 111680, 111985, 112067, 112127, 112335, 112344, 112345,
  112464, 112579, 112727, 113108, 113113, 113124, 113125, 113130, 113140,
  113144, 113145, 113169, 113213, 113268, 113316, 114472, 114919, 115026,
  115109, 115657, 115658, 116269, 116424, 116442, 116507, 116515, 116737,
  116853, 116922, 116976, 117515, 117834, 117989, 118021, 118124, 118449,
  118491, 118730, 118765, 118821, 118964, 119089, 119278, 119354, 119378,
  119398, 119423, 119569, 119656, 119747, 119875, 120275, 120336, 120388,
  120689, 120799, 120977, 121241, 121270, 121454, 121619, 121658, 122111,
  122349, 122402, 122624, 122646, 122745, 123113, 123225, 123414, 123559,
  123714, 123831, 123918, 124175, 124247, 124400, 124733, 124800, 124826,
  124860, 125015, 125034, 125553, 125567, 125582, 125802, 125880, 125955,
  126228, 126285, 126368, 126403, 126487, 126488, 126496, 126561, 126565,
  126566, 126569, 126571, 126575, 126581, 126747, 127067, 127218, 127227,
  127246, 127953, 128212, 128228, 128296, 128526, 128651, 128652, 128937,
  129102, 129279, 129352, 129367, 129411, 129445, 129658, 129718, 129747,
  130234, 130554, 130748, 130770, 130787, 130899, 131008, 131801, 131876,
  131902, 131958, 132118, 132233, 132240, 132495, 132715, 132726, 132732,
  132791, 132831, 132854, 132953, 133502, 133526, 133784, 133996, 134023,
  134174, 134175, 134178, 134181, 134183, 134188, 134332, 134593, 134778,
  134792, 135240, 135287, 135290, 135297, 135373, 135374, 135604, 135838,
  135927, 135985, 136008, 136019, 136054, 136176, 136276, 136423, 136602,
  136691, 136733, 136808, 136879, 136925, 136969, 137177, 137205, 137215,
  137654, 137887, 138302, 138360, 138420, 138601, 139037, 139048, 139148,
  139209, 139223, 139242, 139323, 139967, 140018, 140150, 140152, 140154,
  140180, 140189, 140232, 140251, 140323, 140695, 140781, 141029, 141030,
  141452, 141668, 141705, 141809, 141923, 142067, 142186, 142270, 142296,
  142342, 142396, 142421, 142452, 142567, 142636, 142673, 142715, 142731,
  142739, 142754, 142905, 142934, 143068, 143156, 143437, 143486, 143559,
  143901, 143913, 143936, 144029, 144057, 144357, 144470, 144891, 144941,
  144973, 144974, 145127, 145283, 145368, 145415, 145419, 145428, 145600,
  146287, 146528, 146580, 146639, 146682, 146773, 146846, 147085, 147122,
  147710, 147745, 147825, 148017, 148078, 148164, 148331, 148650, 148651,
  148775, 148815, 148916, 148996, 149026, 149442, 149447, 149458, 149998,
  150076, 150105, 150116, 150162, 150246, 150257, 150326, 150349, 150541,
  150601, 150633, 150729, 150772, 151105, 151279, 151381, 151413, 151553,
  151567, 151839, 151944, 151964, 152384, 152524, 152533, 152630, 152730,
  152947, 153040, 153162, 153212, 153424, 153542, 153729, 153799, 153899,
  153935, 154195, 154235, 154236, 154239, 154240, 154246, 154248, 154252,
  154288, 154319, 154369, 154497, 154499, 154504, 154538, 154547, 154611,
  154784, 154800, 154812, 154838, 154873, 154889, 154984, 155293, 155388,
  155629, 155646, 155734, 156074, 156370, 156437, 156475, 156770, 156877,
  157106, 157180, 157279, 157344, 157735, 157766, 157877, 158277, 158314,
  158326, 158576, 158799, 159113, 159134, 159144, 159320, 159433, 159446,
  159645, 159710, 159712, 159993, 160182, 160700, 160744, 160833, 160928,
  160946, 161001, 161243, 161332, 161414, 161444, 161693, 161765, 162184,
  162480, 162484, 162870, 162910, 162983, 163214, 163299, 163525, 163671,
  164146, 164401, 164406, 164481, 164784, 164869, 165156, 165250, 165256,
  165349, 165354, 165786, 165986, 166014, 166041, 166185, 166247, 166476,
  166508, 166727, 166747, 167341, 167429, 167511, 167859, 167887, 168187,
  168420, 168445, 168714, 168900, 169260, 169388, 169407, 169841, 170163,
  170374, 170540, 170542, 170604, 170724, 170727, 170837, 170995, 171091,
  171095, 171104, 171109, 171110, 171111, 171113, 171121, 171122, 171123,
  171130, 171171, 171185, 171456, 171483, 171996, 172133, 172165, 172812,
  172978, 173152, 173646, 173953, 174155, 174198, 174381, 174879, 174890,
  174902, 175041, 175172, 175201, 175364, 175836, 175952, 176101, 176424,
  176487, 176863, 176925, 177060, 177073, 177111, 177434, 177460, 177479,
  177493, 177692, 177708, 177717, 177843, 177920, 177976, 178174, 178539,
  178723, 178761, 178872, 178918, 178928, 179176, 179530, 180355, 180466,
  180511, 180768, 181182, 181191, 181471, 181549, 181646, 181792, 181999,
  182023, 182135, 182136, 182719, 182902, 183063, 183419, 183427, 183442,
  183519, 183590, 183915, 184075, 184157, 184278, 184336, 184420, 184839,
  184852, 184940, 185406, 185454, 185648, 185731, 185753, 186047, 186207,
  186652, 186845, 187056, 187241, 188324, 188452, 188534, 188553, 188648,
  188656, 188674, 188684, 188691, 188707, 188720, 189529, 190477, 190670,
  190688, 190710, 190823, 191127, 191237, 191243, 191247, 191249, 191259,
  191421, 191458, 191705, 191778, 192179, 192335, 192369, 192421, 192563,
  192633, 192912, 193229, 193290, 193349, 193679, 193751, 193819, 193853,
  193945, 194163, 194474, 194645, 195057, 195100, 195330, 195420, 195655,
  195742, 195979, 196176, 196283, 196315, 196356, 196381, 196716, 196863,
  196902, 196942, 197097, 197248, 197384, 197955, 198044, 198175, 198196,
  198199, 198265, 198270, 198279, 198327, 198560, 198787, 198791, 199087,
  199310, 199424, 199574, 199676, 199730, 199793, 199966, 200277, 200338,
  200442, 200479, 200612, 200709, 200949, 201165, 201197, 201262, 201324,
  201354, 201620, 201921, 201970, 201994, 202086, 202172, 202221, 202285,
  202488, 202509, 202568, 202629, 202636, 202638, 202651, 202655, 202663,
  202666, 202667, 202689, 202708, 202733, 202924, 202933, 203002, 203017,
  203128, 203131, 203137, 203143, 203144, 203198, 203255, 203399, 203468,
  203486, 203727, 204293, 204573, 204661, 204698, 204700, 204856, 205030,
  205069, 205201, 205319, 205430, 205596, 205757, 205768, 205809, 205811,
  205986, 206221, 206565, 206782, 206901, 207518, 207622, 207906, 207924,
  207958, 207980, 208185, 208582, 208667, 208728, 208743, 208908, 208920,
  208932, 208935, 208957, 209067, 209210, 209579, 209618, 209703, 209802,
  210168, 210186, 210674, 210755, 210964, 210967, 210998, 211025, 211068,
  211069, 211562, 211695, 211763, 211949, 211999, 212326, 212635, 212780,
  212801, 213063, 213141, 213483, 214045, 214122, 214287, 214479, 214498,
  214509, 215034, 215237, 215787, 215920, 215968, 216043, 216089, 216157,
  216167, 216245, 216436, 216488, 216528, 216593, 216608, 216670, 216770,
  216800, 216805, 216824, 216864, 217088, 217371, 217394, 217431, 217682,
  217879, 218291, 218610, 219159, 219162, 219239, 219286, 219312, 219618,
  219727, 220217, 220349, 220405, 220761, 221041, 221125, 221230, 221250,
  221564, 221645, 222032, 222491, 222516, 222701, 222884, 222889, 222892,
  222895, 222896, 222934, 222942, 223255, 223556, 223581, 223641, 223644,
  223822, 223835, 224579, 224733, 224754, 224889, 225050, 225079, 225100,
  225693, 225754, 225873, 226187, 226359, 226497, 226536, 226669, 226697,
  226752, 226840, 226872, 226889, 226929, 227108, 227156, 227324, 227449,
  227682, 228447, 228593, 228802, 228888, 228895, 229560, 229650, 229671,
  229680, 229978, 230062, 230236, 230349, 230425, 230431, 230483, 230544,
  230585, 230754, 230953, 231125, 231311, 231343, 231841, 231912, 231950,
  232046, 232421, 232430, 232993, 233070, 233320, 233559, 233697, 233702,
  233744, 233846, 234190, 234302, 234423, 234524, 234879, 235066, 235123,
  235347, 235514, 235545, 235586, 235589, 235660, 235727, 235765, 236019,
  236395, 236562, 236574, 236579, 236588, 236653, 236707, 236831, 237232,
  237310, 237876, 238425, 238443, 238445, 238458, 238531, 238541, 238577,
  238716, 238743, 239558, 239624, 239812, 240048, 240060, 240405, 240513,
  240572, 241071, 241087, 241118, 241169, 241195, 241225, 241241, 241417,
  241478, 241575, 241733, 241913, 241970, 242069, 242481, 242528, 242706,
  242865, 242942, 242947, 243083, 243631, 243738, 243787, 243870, 243920,
  244091, 244181, 244555, 244565, 244657, 244826, 244846, 244976, 245104,
  245205, 245260, 245435, 245887, 246069, 246082, 246114, 246217, 246382,
  246400, 246639, 246699, 246707, 246870, 247185, 247309, 247406, 247629,
  247709, 247718, 247723, 247962, 248077, 248127, 248188, 248340, 248513,
  248525, 249187, 249604, 249686, 249714, 249863, 249959, 250082, 250354,
  250371, 250405, 250441, 250525, 251107, 251155, 251334, 251449, 251813,
  251815, 251851, 251852, 251862, 251886, 251912, 251921, 252066, 252116,
  252228, 252341, 252943, 253284, 253739, 254343, 254399, 254514, 254697,
  254927, 254951, 255286, 255615, 255659, 255741, 255845, 256214, 256386,
  256467, 256518, 256574, 256582, 256609, 256724, 257060, 257194, 257307,
  257308, 257481, 257581, 257582, 257586, 257588, 257590, 257595, 257712,
  257881, 258056, 258282, 258705, 259354, 259679, 259848, 259857, 260116,
  260162, 260253, 260478, 260502, 260518, 261450, 261920, 262554, 263699,
  263717, 263774, 264035, 264189, 264338, 264342, 264350, 264516, 264549,
  264658, 264698, 264859, 265271, 265288, 265487, 265533, 265865, 265972,
  265992, 266006, 266030, 266034, 266036, 266081, 266141, 266826, 267215,
  267574, 267599, 267731, 267849, 268196, 268199, 268220, 268306, 268312,
  268360, 268365, 268378, 268389, 268497, 268520, 268526, 268530, 268544,
  268546, 268548, 268549, 268651, 268753, 268791, 268876, 268881, 268969,
  269864, 270035, 270458, 270527, 270678, 270753, 270930, 271673, 271930,
  271963, 272095, 272111, 272120, 272156, 272186, 272223, 272401, 272504,
  272857, 273024, 273251, 273334, 273345, 273371, 273550, 274010, 274182,
  274276, 274334, 274353, 274393, 274676, 274765, 274859, 274963, 275949,
  275979, 276206, 276716, 276917, 277203, 277327, 277332, 277335, 277368,
  277463, 277617, 278148, 278171, 278527, 278908, 278989, 279470, 279492,
  279582, 280240, 280253, 280419, 280692, 280701, 280775, 281011, 281378,
  281397, 281577, 281648, 281668, 281891, 282031, 282112, 282153, 282307,
  282500, 282808, 282879, 283552, 283579, 283642, 283941, 284278, 284546,
  284880, 284970, 285117, 285182, 285291, 285329, 285408, 285412, 285419,
  285461, 285475, 285740, 285766, 285914, 286371, 286381, 286594, 286726,
  287112, 287148, 287507, 287528, 287723, 287844, 287934, 287944, 287992,
  288201, 288849, 288981, 288991, 289384, 290179, 290188, 290199, 290220,
  290425, 290426, 290433, 290444, 290445, 291352, 291601, 291754, 291966,
  292035, 292296, 292566, 292836, 292986, 293049, 293236, 293353, 293541,
  293611, 293711, 293756, 293973, 294035, 294059, 294119, 294436, 294825,
  294917, 294924, 295153, 295478, 295645, 295679, 296073, 297288, 297363,
  297373, 297781, 298085, 298633, 298949, 299073, 299131, 299309, 299313,
  300445, 300489, 300535, 300995, 301155, 301574, 301686, 301989, 302249,
  302630, 302746, 302754, 303050, 303136, 303341, 303894, 303959, 304007,
  304097, 304108, 304577, 304741, 305057, 305132, 305137, 305143, 305320,
  305363, 305374, 305393, 305413, 306105, 306401, 306546, 306639, 306832,
  306836, 306838, 306853, 306858, 307038, 307068, 307153, 307233, 307234,
  307316, 307372, 307661, 307875, 308393, 309113, 309159, 309321, 309442,
  310239, 311299, 311481, 311713, 311814, 312104, 312125, 312810, 313117,
  313205, 313474, 313691, 313703, 313866, 314183, 314254, 314696, 314704,
  314707, 314884, 314978, 315190, 315286, 315287, 315418, 315733, 316148,
  316249, 316660, 316902, 317216, 317334, 317426, 317565, 317584, 317699,
  317857, 318247, 318688, 319094, 319437, 319574, 320119, 320281, 320688,
  320716, 320733, 320871, 320922, 321062, 321095, 321216, 321522, 321767,
  321798, 322979, 323167, 323354, 323430, 323490, 324234, 324302, 324627,
  324754, 324966, 325009, 325199, 325223, 325354, 325467, 325573, 325587,
  325608, 325625, 325736, 325790, 326110, 326202, 326236, 326459, 326820,
  326901, 327352, 327425, 327637, 328357, 328610, 328612, 328614, 328621,
  328622, 328678, 328829, 328885, 329119, 329134, 329493, 329655, 329724,
  330046, 330180, 330366, 330893, 331676, 331746, 333018, 333022, 333056,
  333590, 333804, 334147, 334150, 334152, 334405, 334590, 334725, 334819,
  335219, 335610, 335932, 336191, 336255, 336402, 336459, 336511, 336515,
  336873, 336906, 337023, 337136, 337681, 337689, 337715, 337716, 338589,
  338707, 338883, 338944, 339064, 339071, 339301, 339819, 340225, 340557,
  340587, 340634, 341997, 342185, 342404, 342514, 342617, 342901, 342925,
  343176, 343191, 343381, 343631, 343704, 343967, 344107, 344291, 344298,
  344300, 344305, 344306, 344809, 345371, 345882, 346052, 346651, 346704,
  347014, 347259, 347326, 347333, 347367, 347755, 348297, 348319, 348336,
  348661, 349405, 349594, 349814, 350145, 350288, 350378, 350832, 351223,
  351407, 351510, 351713, 352223, 352232, 352233, 352455, 352604, 352670,
  352732, 352944, 352962, 353006, 353042, 353070, 353090, 353491, 353627,
  353755, 353792, 353871, 354004, 354032, 354042, 354085, 354529, 354813,
  355128, 355131, 355133, 355257, 355351, 355855, 356339, 356561, 356761,
  356859, 357121, 357122, 357387, 357539, 357618, 357635, 357999, 358002,
  358172, 358216, 358253, 359048, 359149, 359804, 359828, 359934, 359997,
  360040, 360083, 360285, 360335, 360591, 360782, 360861, 361098, 361295,
  361612, 361848, 361907, 362445, 362623, 362821, 362975, 363042, 363243,
  363301, 363431, 363492, 363652, 363682, 363915, 364397, 364540, 364543,
  365550, 365678, 365730, 365737, 365996, 366212, 366413, 366472, 366846,
  366919, 367067, 367142, 367183, 367247, 367304, 367324, 367347, 367365,
  367416, 367888, 367897, 367911, 368152, 368317, 368943, 368949, 368953,
  368955, 369042, 369075, 369117, 369835, 371874, 372043, 372134, 372287,
  372439, 372732, 372830, 373024, 373102, 373271, 373412, 373448, 373662,
  374279, 374688, 374888, 374973, 375132, 375742, 375746, 375747, 375758,
  375779, 375863, 375963, 377703, 377965, 378604, 378803, 379311, 379507,
  379678, 380086, 380722, 380891, 380918, 381118, 381133, 381134, 381181,
  381200, 381461, 381583, 381663, 381672, 381689, 381697, 381781, 381920,
  382128, 382493, 382521, 382699, 382797, 382973, 383087, 383334, 383339,
  383368, 383598, 383746, 383986, 384381, 384452, 384584, 385144, 385177,
  385367, 385503, 385951, 386085, 386101, 386141, 386416, 387277, 388409,
  388490, 388493, 388654, 388759, 389140, 389186, 389244, 389523, 389669,
  391322, 391468, 391555, 391890, 392097, 392317, 392588, 392946, 393189,
  393217, 393366, 393811, 394108, 394138, 394564, 395059, 395171, 395224,
  395234, 395263, 395447, 395763, 395865, 396457, 396946, 397010, 397013,
  397076, 397284, 397343, 397371, 397582, 397607, 397680, 397716, 397824,
  397915, 398503, 398518, 398676, 399058, 399112, 399717, 399719, 399720,
  400083, 400488, 400562, 400564, 400787, 401043, 401115, 401199, 401333,
  401354, 401437, 401789, 401865, 401894, 402132, 402190, 402422, 402986,
  403385, 403430, 403755, 403925, 404027, 404199, 404206, 404207, 404208,
  404212, 404213, 404384, 405159, 405278, 405280, 405427, 405538, 406298,
  406636, 407118, 407123, 407338, 407553, 408148, 408779, 408826, 409244,
  409580, 409667, 409708, 409721, 410024, 410205, 410323, 410731, 410814,
  411295, 411755, 411802, 411892, 411954, 411985, 411986, 412014, 412294,
  412295, 412296, 412555, 412600, 412771, 412819, 412921, 412931, 412970,
  413387, 413418, 413563, 413700, 413887, 414539, 414656, 414946, 415065,
  415194, 415973, 416066, 416068, 416345, 416384, 416646, 416878, 417060,
  417202, 417235, 417380, 417641, 417645, 417648, 417728, 418020, 418271,
  418518, 418708, 418763, 418918, 419027, 419307, 419403, 419555, 419653,
  419741, 419757, 419774, 420051, 420118, 420371, 420460, 420762, 420814,
  421034, 421265, 421275, 421333, 421468, 421791, 422185, 422624, 422912,
  423077, 423197, 423423, 423565, 423975, 424007, 424299, 424312, 424453,
  424819, 424885, 425147, 425344, 425609, 425614, 425708, 425868, 426206,
  426231, 426232, 426363, 427198, 427366, 427616, 427831, 428131, 428221,
  428268, 428515, 428528, 428639, 428755, 429201, 429353, 429382, 429600,
  429835, 429883, 430376, 430646, 430957, 430998, 431024, 431721, 431948,
  431953, 431954, 431961, 431963, 431964, 432015, 432024, 432299, 432310,
  432320, 432412, 432468, 433170, 433378, 433454, 434077, 434184, 434473,
  435012, 435232, 435344, 435455, 435645, 436077, 436151, 436303, 436340,
  436721, 437161, 437525, 437532, 437956, 438452, 438932, 439663, 439697,
  439753, 439924, 439927, 440784, 440923, 441130, 441243, 441361, 441823,
  441980, 442130, 442235, 442330, 442630, 442804, 443121, 443143, 443533,
  443548, 443599, 443763, 443790, 444191, 444394, 444481, 444575, 444591,
  444597, 445309, 445401, 445425, 445512, 445798, 445866, 445934, 446142,
  446300, 446313, 446463, 446678, 447068, 447381, 447529, 447700, 447922,
  448016, 448061, 448063, 448064, 448067, 448070, 448073, 448250, 448880,
  449227, 449246, 449395, 449487, 449619, 449875, 450012, 450111, 450410,
  450807, 450930, 450952, 451935, 452006, 452637, 452739, 452970, 453025,
  453591, 453604, 453609, 453630, 453695, 453765, 453975, 454633, 455021,
  455076, 456074, 456287, 456822, 456940, 457110, 457700, 458453, 458603,
  459481, 459626, 460340, 460447, 460452, 460687, 460772, 461308, 461314,
  461373, 461899, 462488, 462522, 462542, 462837, 462924, 463188, 463287,
  463785, 464784, 464893, 465927, 466331, 466363, 466442, 466879, 466891,
  466908, 467192, 467200, 467201, 467525, 467793, 468174, 469012, 469049,
  469131, 469434, 469499, 470172, 470305, 470434, 470685, 471045, 471105,
  471425, 471581, 471937, 472258, 472573, 472657, 472720, 472924, 473035,
  473476, 474049, 474466, 474643, 474980, 475108, 475555, 476481, 476910,
  477008, 477219, 477314, 477315, 477495, 477720, 477751, 477767, 477772,
  477965, 478176, 478408, 478750, 478751, 478791, 479356, 479357, 479512,
  480559, 480563, 480750, 481001, 481065, 481677, 482672, 483234, 483382,
  483566, 483702, 484032, 484039, 484298, 484457, 484778, 485246, 485368,
  485991, 486158, 486376, 486533, 486535, 486539, 486545, 486546, 486547,
  487261, 487828, 487872, 487941, 488247, 488559, 488842, 488866, 489189,
  489309, 489413, 490293, 490330, 490486, 490943, 490998, 491132, 491273,
  491778, 491921, 492164, 492166, 492260, 492691, 493867, 494187, 494355,
  494361, 495437, 495901, 496025, 496939, 497126, 497223, 497226, 497247,
  497461, 497647, 497856, 498057, 498207, 498330, 498577, 498930, 499116,
  499434, 499819, 499918, 500331, 500594, 500696, 500795, 500803, 500844,
  501030, 501327, 501668, 502319, 502461, 502636, 503771, 504146, 504265,
  504533, 505003, 505022, 505244, 505508, 506082, 506340, 506352, 507035,
  507745, 507766, 508032, 508181, 508427, 508670, 509074, 509460, 509476,
  510232, 510237, 510493, 510826, 510975, 511876, 512075, 512119, 512556,
  512615, 512806, 512899, 512900, 512975, 513190, 513268, 513427, 513600,
  514610, 514614, 514628, 514630, 515365, 515718, 515923, 516136, 516189,
  516200, 516495, 516815, 517087, 517197, 517327, 517330, 517331, 517337,
  517341, 517344, 517366, 517511, 517957, 518063, 518069, 518078, 518161,
  518316, 518948, 519051, 519199, 519246, 519297, 519298, 519411, 519577,
  519785, 520075, 520203, 520307, 520525, 520564, 521002, 521629, 521652,
  521754, 522351, 522637, 522758, 522912, 523333, 523401, 524301, 524504,
  524552, 524802, 524810, 525018, 525233, 525489, 525853, 526001, 526080,
  526308, 526552, 526557, 527542, 527957, 528181, 528244, 528611, 528675,
  529099, 530077, 530311, 530431, 530718, 530800, 531282, 531760, 531966,
  532333, 532358, 532676, 533089, 533104, 533221, 534429, 535612, 536057,
  536066, 536601, 536671, 537367, 537531, 537636, 537910, 537949, 538167,
  539876, 539990, 540712, 540922, 541819, 541919, 542044, 542062, 542063,
  542114, 542170, 542782, 543004, 543012, 543190, 543552, 543797, 543895,
  544282, 544404, 545208, 545213, 545561, 546696, 547114, 547155, 547503,
  547608, 548384, 549089, 549884, 550990, 551194, 551622, 552282, 552372,
  552946, 552947, 552950, 552951, 553294, 553394, 553461, 554397, 554421,
  555341, 555477, 555565, 555788, 555867, 555878, 557012, 557592, 557673,
  557986, 558185, 558415, 558740, 559133, 559640, 559844, 559918, 560306,
  560323, 560964, 561005, 561715, 561862, 561926, 562403, 562573, 562574,
  563463, 564183, 564796, 564942, 564983, 565101, 565120, 565326, 565793,
  566102, 566285, 566381, 567382, 567621, 567901, 568065, 568452, 568691,
  569694, 569884, 570093, 570883, 571165, 571883, 572280, 572302, 572330,
  572428, 572662, 572737, 572776, 573070, 573150, 573581, 573606, 574571,
  574591, 574934, 575349, 576067, 576412, 576580, 576820, 576862, 577350,
  577447, 578009, 578106, 578391, 578453, 579248, 579913, 579932, 580099,
  580103, 580119, 581277, 581345, 581418, 581787, 581854, 583935, 584466,
  584516, 585110, 585314, 585443, 585769, 585963, 586357, 586602, 587017,
  587343, 587698, 587724, 588220, 588360, 588619, 588641, 589242, 589725,
  589768, 589850, 589906, 590096, 590435, 590646, 591693, 591779, 591825,
  592029, 592042, 592093, 592869, 593997, 594045, 594331, 594614, 594618,
  594703, 594862, 594943, 595204, 595925, 596500, 598026, 598907, 599723,
  600047, 600064, 600144, 600204, 600589, 600591, 600592, 600593, 600674,
  601239, 601526, 602613, 603159, 603757, 604204, 604232, 604394, 605053,
  605915, 606002, 606139, 606491, 606693, 606695, 606795, 607929, 607992,
  607996, 608110, 608205, 609343, 609453, 610379, 611062, 611277, 611311,
  611927, 611946, 612944, 613653, 613899, 614068, 614143, 615134, 615688,
  617135, 617146, 617182, 617283, 617407, 617705, 618088, 618337, 618913,
  619032, 619518, 620052, 620265, 620663, 621069, 621258, 621290, 621348,
  621776, 622025, 622032, 622528, 622813, 623224, 623442, 623654, 623682,
  624725, 625513, 625523, 625609, 625804, 625897, 626181, 627344, 627345,
  627346, 627348, 627349, 627353, 628115, 629233, 629773, 629906, 630509,
  630538, 631347, 632029, 632425, 632501, 633709, 634269, 634444, 634768,
  634953, 635388, 635456, 636097, 636348, 636355, 636362, 636775, 638185,
  638386, 638415, 638429, 639396, 639724, 639898, 640229, 640304, 641003,
  641741, 641894, 641901, 641998, 643541, 643929, 644456, 646039, 646092,
  646118, 646121, 646123, 646124, 646129, 647016, 647422, 647640, 647671,
  647916, 648406, 648646, 648852, 648960, 649705, 650883, 650884, 650957,
  651115, 652254, 652768, 653030, 654902, 655631, 655673, 655939, 656848,
  656850, 657235, 658273, 658288, 658735, 658947, 659419, 660467, 660836,
  660955, 661399, 663055, 663089, 663360, 663807, 664111, 665428, 665591,
  666463, 667143, 667436, 667578, 667880, 667955, 667980, 668695, 669230,
  669312, 669730, 669787, 670031, 670541, 670921, 671311, 671358, 671854,
  672420, 673876, 673961, 673988, 674552, 674787, 674882, 675056, 676112,
  676858, 676937, 677200, 677807, 678535, 679040, 679869, 680029, 680428,
  682285, 682488, 682610, 682756, 683027, 683499, 685259, 685346, 685589,
  685668, 686706, 686902, 687283, 688093, 688739, 689072, 689938, 690458,
  690620, 691414, 691983, 692218, 694022, 694024, 694217, 695524, 695526,
  697210, 697627, 698125, 698374, 699029, 700366, 701193, 701637, 702050,
  704400, 704757, 704802, 705322, 707632, 707741, 707750, 707972, 708034,
  709050, 709298, 709323, 709594, 710433, 710586, 710601, 714457, 714871,
  714889, 715119, 715828, 716571, 716591, 716773, 718581, 718939, 719027,
  721126, 721700, 722401, 722406, 722427, 723691, 723693, 725707, 726789,
  726810, 727847, 727854, 728271, 729378, 730056, 730975, 731225, 732612,
  732717, 732801, 733011, 733361, 733590, 733769, 733996, 734961, 735532,
  736581, 738257, 738333, 740681, 741548, 742300, 742305, 742480, 744560,
  745412, 746135, 746797, 746932, 747326, 747402, 747530, 748341, 750398,
  750516, 752409, 752655, 754478, 757448, 758675, 760169, 760196, 761594,
  763023, 763263, 763264, 766149,
];

@Component({
  selector: "app-pattern",
  templateUrl: "pattern.page.html",
  styleUrls: ["pattern.page.scss"],
})
export class PatternPage {
  public min;
  public max;
  public nowIndex = -1;
  public patternList = [];
  public results;
  public user;

  // for paging
  public paging: Paging;
  public pageNum = 1;
  public isFirstInit = false;

  previousUrl: string = null;
  currentUrl: string = null;
  constructor(
    public router: Router,
    public navController: NavController,
    public alertController: AlertController,
    public modalController: ModalController,
    public dataService: DataService,
    public patternService: PatternService,
    public userService: UserService
  ) {}
  ngOnInit() {}

  async ionViewDidEnter() {
    this.user = await this.userService.getUser();
    await this.getPatternPageView();
  }

  async handleChange(event) {
    this.results = event.target.value;
    const { data } = await this.patternService.getPatternSearchList(
      this.results
    );
    console.log(data);
  }

  async getRecommendYarnData() {
    for (let i of famousList) {
      const response = await this.dataService.getPatternDataFromRaverly(i);
      console.log("for i =", i, response);
      const postResult = await this.dataService.postPatternData(response);
      this.nowIndex = i;
    }
  }

  // 이미지 없는 패턴 리스트 받아서 라이벌리에서 받은 후 전송 ..
  async getAndFetchPatternData() {
    const { data } = await this.dataService.getEmptyImageIndex();
    console.log(data.indexList);
    if (data.status === "Y") {
      const { indexList } = data;
      for (let index of indexList) {
        const response = await this.dataService.getPatternDataFromRaverly(
          index
        );
        console.log("for i =", index, response);
        const postResult = await this.dataService.postPatternData(response);
      }
    }
  }

  async getPatternPageView() {
    // 유저 level에 따른 다른 데이터 불러오기
    console.log(this.user);

    if (!this.user || this.user.level < 1) {
      const { data } = await this.patternService.getRandomPatternList();
      console.log("pattern when level 0", data);
      if (data.status === "Y") {
        this.patternList = [...this.patternList, ...data.patternList];
      }
    } else if (this.user.level === 1) {
      const { data } = await this.patternService.getRecommendPatternList(
        this.pageNum
      );
      if (data.isUserLogin === "N") {
        this.setUserSyncWithServer();
      }
      if (data.status === "Y") {
        console.log("페이지네이션 성공 ", data);

        if (this.pageNum === 1) {
          this.patternList = [...data.patternList];
        } else {
          this.patternList = [...this.patternList, ...data.patternList];
        }
        console.log("pattern list is ", this.patternList);

        this.paging = data.mainPaging;
        this.pageNum += 1;
      }
    }
  }

  loadData(event) {
    setTimeout(async () => {
      await this.getPatternPageView();
      event.target.complete();
      // if (this.paging.curPage === this.paging.totalPage) {
      //   event.target.disabled = true;
      // }
    }, 500);
  }
  async goSearchPatternPage() {
    this.navController.navigateForward(`/tabs/pattern/search`);
  }

  goMypage() {
    this.navController.navigateForward("mypage");
  }

  resetProperties() {
    this.paging = null;
    this.pageNum = 1;
  }

  async setUserSyncWithServer() {
    await this.userService.deleteUser();
    alert("다시 로그인 해 주세요");
  }
  // async getRaverlyApi() {
  //   if (!this.min || !this.max) {
  //     const alert = await this.alertController.create({
  //       header: "에러",
  //       message: "범위를 입력해 주세요",
  //       buttons: ["확인"],
  //     });
  //     await alert.present();
  //     return;
  //   }
  //   const subHeader = `index 가 ${this.min} ~ ${this.max}인 `;
  //   const message = "api 를 호출하시겠습니까?";
  //   let flag = false;
  //   const alert = await this.alertController.create({
  //     subHeader,
  //     message,
  //     buttons: [
  //       {
  //         text: "취소",
  //         handler: async () => {
  //           this.alertController.dismiss();
  //         },
  //       },
  //       {
  //         text: "확인",
  //         handler: async () => {
  //           await this.getAndFetchYarnData();
  //           flag = true;
  //         },
  //       },
  //     ],
  //   });
  //   await alert.present();
  // }
}

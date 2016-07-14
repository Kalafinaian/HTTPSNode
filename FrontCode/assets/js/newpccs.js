var jsontext=[
    {
        "province":"四川省",
        "city":[
            {
                "cityName":"阿坝藏族羌族自治州",
                "county":["阿坝县", "黑水县", "红原县", "金川县", "九寨沟县", "理县", "马尔康县", "茂县", "壤塘县", "若尔盖县", "松潘县", "小金县", "汶川县"]
            },
            {
                "cityName":"巴中",
                "county":["巴中市", "南江县", "平昌县", "通江县"]

            },
            {
                "cityName":"成都",
                "county":["成都市", "崇州市", "大邑县", "都江堰市", "金堂县", "彭州市", "蒲江县", "双流县", "新津县", "邛崃市", "郫县"]
            },
            {
                "cityName":"达州",
                "county":["达县", "达州市", "大竹县", "开江县", "渠县", "万源市", "宣汉县"]
            },
            {
                "cityName":"德阳",
                "county":["德阳市", "广汉市", "罗江县", "绵竹市", "什邡市", "中江县"]

            },
            {
                "cityName":"甘孜藏族自治州",
                "county":["巴塘县", "白玉县", "丹巴县", "稻城县", "道孚县", "德格县", "得荣县", "甘孜县", "九龙县", "康定县", " 理塘县", "炉霍县", "色达县", "石渠县", "乡城县", "新龙县", "雅江县", "泸定县"]
            },
            {
                "cityName":"广安",
                "county":["广安市", "华蓥市", "邻水县", "武胜县", "岳池县"]
            },
            {
                "cityName":"广元",
                "county":["苍溪县", "广元市", "剑阁县", "青川县", "旺苍县"]

            },
            {
                "cityName":"乐山",
                "county":["峨边彝族自治县", "峨眉山市", "夹江县", "井研县", "乐山市", "马边彝族自治县", "沐川县", "犍为县"]
            },
            {
                "cityName":"凉山彝族自 治州",
                "county":["布拖县", "德昌县", "甘洛县", "会东县", "会理县", "金阳县", "雷波县", "美姑县", "冕宁县", "木里藏族自治 县", "宁南县", "普格县", "西昌市", "喜德县", "盐源县", "越西县", "昭觉县"]
            },
            {
                "cityName":"眉山",
                "county":["丹棱县", "洪雅县", "眉山市", "彭山县", "青神县", "仁寿县"]

            },
            {
                "cityName":"绵阳",
                "county":["安县", "北川县", "江油市", "绵阳市", "平武县", "三台县", "盐亭县", "梓潼县"]
            },
            {
                "cityName":"南充",
                "county":["南部县", "南充市", "蓬安县", "西充县", "仪陇县", "营山县", "阆中市"]
            },
            {
                "cityName":"内江",
                "county":["隆昌县", "内江市", "威远县", "资中县"]

            },
            {
                "cityName":"攀枝花",
                "county":["米易县", "攀枝花市", "盐边县"]
            },
            {
                "cityName":"遂宁",
                "county":["大英县", "蓬溪县", "射洪县", "遂宁市"]
            },
            {
                "cityName":"雅安",
                "county":["宝兴县", "汉源县", "芦山县", "名山县", "石棉县", "天全县", "雅安市", "荥经县"]

            },
            {
                "cityName":"宜宾",
                "county":["长宁县", "高县", "江安县", "南溪县", "屏山县", "兴文县", "宜宾市", "宜宾县", "珙县", "筠连县"]
            },
            {
                "cityName":"资阳",
                "county":["安岳县", "简阳市", "乐至县", "资阳市"]
            },
            {
                "cityName":"自贡",
                "county":["富顺县", "荣县", "自贡市"]

            },
            {
                "cityName":"泸州",
                "county":["古蔺县", "合江县", "叙永县", "泸县", "泸州市"]
            }
            ]
    }

];


var  selectOID=new Array("province_select","city_select","county_select");
var  selecttext=new Array("请选择省","请选择市","请选择县/区");

function getEL(obj)
{
    return   document.getElementById(obj);
}

function selectinit()  //初始化select
{
    for(var i=0; i<selectOID.length; i++)
    {
        getEL(selectOID[i]).options[0]=new Option(selecttext[i],selecttext[i]);  // 找到数组里面相应的ID依次绑定初始值
    }
}



function  bind_province()  //绑定所有省
{
    var provinceselect=getEL(selectOID[0]);
    for(var i=0; i<jsontext.length; i++)
    {

        provinceselect.options[i+1]=new Option(jsontext[i].province,jsontext[i].province);


    }

}
function bind_province_onchange()  //给省绑定选择改变事件
{
    var provinceselect=getEL(selectOID[0]);
    provinceselect.onchange=function()
    {
        var n=this.selectedIndex;
        if(n==0)
        {
            clear_city();//清空市
            provinceselect.options[0].selected=true;//默认选中第0个option

        }else
        {
            clear_city();
            bind_city(n-1);//调用绑定市的方法
        }
//alert(n);

    }

}

function bind_city(obj)//绑定市
{
    var cityselect=getEL(selectOID[1]);

    for(var i=0; i<jsontext[obj].city.length;i++)
    {
        cityselect.options[i+1]=new Option(jsontext[obj].city[i].cityName,jsontext[obj].city[i].cityName);


    }


    cityselect.options[1].selected=true;
    bind_county(0);


}
function clear_city()   //清空市
{
    var cityselect=getEL(selectOID[1]);
    cityselect.length=0;
    selectinit();

}
function clear_county()   //清空先县
{
    var countyselect=getEL(selectOID[2]);
    countyselect.length=0;
    selectinit();

}



function bind_city_onchange()  //给市绑定选择改变事件
{
    var cityselect=getEL(selectOID[1]);
    cityselect.onchange=function(){
        var n= cityselect.selectedIndex;

        if(n==0)
        {


            clear_county();
            cityselect.options[0].selected=true;

        }else
        {
            clear_county();
            bind_county(n-1);
        }





    }


}
function  bind_county(obj)
{
    var countyselect=getEL(selectOID[2]);
    var provinceselect=getEL(selectOID[0]);
    var provinceIndex=provinceselect.selectedIndex;
    for(var i =0; i<jsontext[provinceIndex-1].city[obj].county.length; i++)
    {

        countyselect.options[i+1]=new Option(jsontext[provinceIndex-1].city[obj].county[i],jsontext[provinceIndex-1].city[obj].county[i]);
    }

}



function init()
{

    selectinit();
    bind_province();
    bind_province_onchange();
    bind_city_onchange();

}
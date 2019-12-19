#version 300 es
precision highp float;

//TODO: Modify as needed
 
in vec2 v_screencoord;

out vec4 color;

uniform sampler2D color_sampler;
uniform sampler2D depth_sampler;
uniform sampler2D motion_sampler;
uniform mat4 P_i; // Projection matrix inverse
uniform mat4 prevVP;


const int WINDOW = 32;
const float sigma = 40.0;

void main(){

    float depth = texture(depth_sampler, v_screencoord).x;
    vec4 NDC = vec4(2.0*v_screencoord.x-1.0, 2.0*v_screencoord.y-1.0, 2.0*depth-1.0, 1.0);
    vec4 cur_world_pos = P_i *  NDC;// regenerate the NDC and multiply by projection inverse
    cur_world_pos = cur_world_pos / cur_world_pos.w;
    //cur_world_pos = cur_world_pos / cur_world_pos.w; // Divide by w to get the point in view space

    vec4 prev_world_pos = cur_world_pos - texture(motion_sampler, v_screencoord);  //review
   //prev_world_pos = prev_world_pos / prev_world_pos.w; // Divide by w to get the point in view space
    vec4 prevNDC = prevVP * prev_world_pos;
    prevNDC = prevNDC / prevNDC.w;
    vec2 prev_screencoord = 0.5 * (prevNDC.xy + 1.0);
    vec2 interpolation = v_screencoord - prev_screencoord;
    vec2 stp = interpolation / float(WINDOW);

    float two_sigma_sqr = 2.0*sigma*sigma;

    float total_weight = 0.0;
    color = vec4(0);
    // Here we calculate a weighted mean from samples located on a radial direction
    for(int i = 0; i <= WINDOW; i++){
        float weight = exp(-float(i*i)/two_sigma_sqr);
        color += texture(color_sampler, v_screencoord - float(i) * stp) * weight;
        total_weight += weight;
    }
    color /= total_weight;


   // color = texture(color_sampler, v_screencoord); // Sample texture color and send it as is
}